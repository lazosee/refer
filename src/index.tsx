import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { getShortCode } from "./lib/hash";
import { LinkMetadata, ShortLink } from "./types";
import {
  DashboardPage,
  CreatePage,
  EditPage,
  Layout,
} from "./components/Pages";
import { cors } from "hono/cors";

type Bindings = CloudflareBindings & {
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", cors({}));

// Prevent favicon from triggering redirection logic
app.get("/favicon.ico", (c) => c.text("", 404));

// Redirect root to dashboard
app.get("/", (c) => c.redirect("/dashboard"));

// Hono Basic Auth Middleware for all dashboard routes
app.use("/dashboard*", async (c, next) => {
  const auth = basicAuth({
    username: c.env.ADMIN_USERNAME || "admin",
    password: c.env.ADMIN_PASSWORD || "admin123",
  });
  return auth(c, next);
});

// View all links
app.get("/dashboard", async (c) => {
  try {
    const list = await c.env.KV.list<LinkMetadata>();
    const links: ShortLink[] = [];

    for (const key of list.keys) {
      const originalUrl = key.metadata?.originalUrl || "";
      links.push({
        code: key.name,
        originalUrl,
        metadata: {
          originalUrl,
          label: key.metadata?.label,
          createdAt: key.metadata?.createdAt || new Date().toISOString(),
          updatedAt: key.metadata?.updatedAt,
          clicks: key.metadata?.clicks || 0,
        },
      });
    }

    // Sort by creation date descending (newest first)
    links.sort(
      (a, b) =>
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime(),
    );

    const url = new URL(c.req.url);
    const hostUrl = `${url.protocol}//${url.host}`;
    const successMessage = c.req.query("success") || undefined;

    return c.html(
      <DashboardPage
        links={links}
        hostUrl={hostUrl}
        successMessage={successMessage}
      />,
    );
  } catch (error) {
    console.error("Error fetching links from KV:", error);
    return c.html(
      <Layout title="Error" activeTab="links">
        <div className="card" style={{ padding: "40px", textAlign: "center" }}>
          <h2 style={{ color: "var(--accent-danger)", marginBottom: "12px" }}>
            Failed to Load Dashboard
          </h2>
          <p style={{ color: "var(--text-secondary)" }}>
            There was an error connecting to Cloudflare KV. Make sure your local
            KV storage bindings are correctly initialized.
          </p>
        </div>
      </Layout>,
    );
  }
});

// GET Create Link Form
app.get("/dashboard/create", (c) => {
  const url = new URL(c.req.url);
  const hostUrl = `${url.protocol}//${url.host}`;
  return c.html(<CreatePage hostUrl={hostUrl} />);
});

// POST Create Link Form
app.post("/dashboard/create", async (c) => {
  const body = await c.req.parseBody();
  const originalUrl = (body.originalUrl as string)?.trim();
  const label = (body.label as string)?.trim();
  let code = (body.code as string)?.trim();

  const url = new URL(c.req.url);
  const hostUrl = `${url.protocol}//${url.host}`;

  if (!originalUrl) {
    return c.html(
      <CreatePage
        hostUrl={hostUrl}
        errorMessage="Destination URL is required."
      />,
    );
  }

  try {
    new URL(originalUrl);
  } catch {
    return c.html(
      <CreatePage
        hostUrl={hostUrl}
        errorMessage="Invalid destination URL format (must include protocol, e.g. https://)."
      />,
    );
  }

  try {
    if (code) {
      // Validate custom short code format
      const codeRegex = /^[a-zA-Z0-9-_]+$/;
      if (!codeRegex.test(code)) {
        return c.html(
          <CreatePage
            hostUrl={hostUrl}
            errorMessage="Short code can only contain letters, numbers, dashes, and underscores."
          />,
        );
      }

      const exists = await c.env.KV.get(code);
      if (exists) {
        return c.html(
          <CreatePage
            hostUrl={hostUrl}
            errorMessage={
              'The short code "/' +
              code +
              '" is already in use. Please select a different one.'
            }
          />,
        );
      }
    } else {
      // Auto-generate unique short code
      let counter = 0;
      const MAX_RETRIES = 5;
      let exists: string | null = null;
      do {
        const urlToHash =
          counter === 0 ? originalUrl : `${originalUrl}-${counter}`;
        code = await getShortCode(urlToHash);
        exists = await c.env.KV.get(code);
        if (exists) {
          counter++;
          if (counter > MAX_RETRIES) {
            return c.html(
              <CreatePage
                hostUrl={hostUrl}
                errorMessage="Failed to generate a unique short code. Please enter a custom one."
              />,
            );
          }
        }
      } while (exists);
    }

    // Save to KV with metadata
    const metadata: LinkMetadata = {
      originalUrl,
      label: label || undefined,
      createdAt: new Date().toISOString(),
      clicks: 0,
    };

    await c.env.KV.put(code, originalUrl, { metadata });

    return c.redirect(
      `/dashboard?success=Short+link+/${code}+created+successfully!`,
    );
  } catch (error) {
    console.error("Error creating short link:", error);
    return c.html(
      <CreatePage
        hostUrl={hostUrl}
        errorMessage="An internal error occurred while saving the link."
      />,
    );
  }
});

// GET Edit Link Form
app.get("/dashboard/edit/:code", async (c) => {
  const code = c.req.param("code");
  const url = new URL(c.req.url);
  const hostUrl = `${url.protocol}//${url.host}`;

  try {
    const linkData = await c.env.KV.getWithMetadata<LinkMetadata>(code);
    if (!linkData.value) {
      return c.redirect("/dashboard?error=Link+not+found");
    }

    const shortLink: ShortLink = {
      code,
      originalUrl: linkData.value,
      metadata: linkData.metadata || {
        originalUrl: linkData.value,
        clicks: 0,
        createdAt: new Date().toISOString(),
      },
    };

    return c.html(<EditPage link={shortLink} hostUrl={hostUrl} />);
  } catch (error) {
    console.error(`Error loading edit page for code /${code}:`, error);
    return c.redirect("/dashboard?error=Failed+to+load+link+details");
  }
});

// POST Edit Link Form (Update destination URL)
app.post("/dashboard/edit/:code", async (c) => {
  const code = c.req.param("code");
  const body = await c.req.parseBody();
  const originalUrl = (body.originalUrl as string)?.trim();
  const label = (body.label as string)?.trim();

  const url = new URL(c.req.url);
  const hostUrl = `${url.protocol}//${url.host}`;

  try {
    const linkData = await c.env.KV.getWithMetadata<LinkMetadata>(code);
    if (!linkData.value) {
      return c.redirect("/dashboard?error=Link+not+found");
    }

    const shortLink: ShortLink = {
      code,
      originalUrl: linkData.value,
      metadata: linkData.metadata || {
        originalUrl: linkData.value,
        clicks: 0,
        createdAt: new Date().toISOString(),
      },
    };

    if (!originalUrl) {
      return c.html(
        <EditPage
          link={shortLink}
          hostUrl={hostUrl}
          errorMessage="Destination URL is required."
        />,
      );
    }

    try {
      new URL(originalUrl);
    } catch {
      return c.html(
        <EditPage
          link={shortLink}
          hostUrl={hostUrl}
          errorMessage="Invalid destination URL format (must include protocol, e.g. https://)."
        />,
      );
    }

    // Save changes by replacing originalUrl value and updating metadata
    const updatedMetadata: LinkMetadata = {
      originalUrl,
      label: label || undefined,
      createdAt: shortLink.metadata.createdAt,
      updatedAt: new Date().toISOString(),
      clicks: shortLink.metadata.clicks || 0,
    };

    await c.env.KV.put(code, originalUrl, { metadata: updatedMetadata });

    return c.redirect(`/dashboard?success=Link+/${code}+updated+successfully!`);
  } catch (error) {
    console.error(`Error updating code /${code}:`, error);
    return c.redirect("/dashboard?error=Failed+to+update+link");
  }
});

// POST Delete Link (Invoked asynchronously from dashboard UI)
app.post("/dashboard/delete/:code", async (c) => {
  const code = c.req.param("code");
  try {
    const exists = await c.env.KV.get(code);
    if (!exists) {
      return c.json({ error: "Link not found" }, 404);
    }
    await c.env.KV.delete(code);
    return c.json({ success: true });
  } catch (error) {
    console.error(`Error deleting link /${code}:`, error);
    return c.json({ error: "Failed to delete link" }, 500);
  }
});

// Backwards-compatible POST API endpoint to shorten urls programmatically
app.post("/api/shorten", async (c) => {
  try {
    const { originalUrl, label } = await c.req.json();
    const url = new URL(c.req.url);

    if (!originalUrl) {
      return c.json({ error: "URL is required" }, 400);
    }

    try {
      new URL(originalUrl);
    } catch {
      return c.json({ error: "Invalid URL format" }, 400);
    }

    let shortCode: string;
    let exists: string | null;
    let counter = 0;
    const MAX_RETRIES = 5;

    do {
      const urlToHash =
        counter === 0 ? originalUrl : `${originalUrl}-${counter}`;
      shortCode = await getShortCode(urlToHash);
      exists = await c.env.KV.get(shortCode);

      if (exists) {
        counter++;
        if (counter > MAX_RETRIES) {
          return c.json({ error: "Failed to generate unique short code" }, 500);
        }
      }
    } while (exists);

    const shortenedUrl = `${url.protocol}//${url.host}/${shortCode}`;

    const metadata: LinkMetadata = {
      originalUrl,
      label: label || undefined,
      createdAt: new Date().toISOString(),
      clicks: 0,
    };

    await c.env.KV.put(shortCode, originalUrl, { metadata });

    return c.json({ shortenedUrl }, 201);
  } catch (error) {
    console.error("Error in programatic /api/shorten endpoint:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// Public Redirection Route
app.get("/:code", async (c) => {
  const code = c.req.param("code");
  try {
    const linkData = await c.env.KV.getWithMetadata<LinkMetadata>(code);

    if (!linkData.value) {
      return c.html(
        <Layout title="404 - Not Found" activeTab="links">
          <div
            className="card"
            style={{ padding: "80px 24px", textAlign: "center" }}
          >
            <h1
              style={{
                fontFamily: "Outfit",
                fontSize: "36px",
                color: "var(--accent-danger)",
                marginBottom: "16px",
              }}
            >
              404 - Link Not Found
            </h1>
            <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
              The short link "/{code}" does not exist or has been deleted.
            </p>
            <a href="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </a>
          </div>
        </Layout>,
        404,
      );
    }

    // Increment click count asynchronously in the background using c.executionCtx.waitUntil
    const metadata = linkData.metadata || {
      originalUrl: linkData.value,
      clicks: 0,
      createdAt: new Date().toISOString(),
    };
    metadata.clicks = (metadata.clicks || 0) + 1;

    c.executionCtx.waitUntil(c.env.KV.put(code, linkData.value, { metadata }));

    return c.redirect(linkData.value);
  } catch (error) {
    console.error(`Error redirecting short code /${code}:`, error);
    return c.redirect("/dashboard?error=Internal+redirection+failure");
  }
});

export default app;
