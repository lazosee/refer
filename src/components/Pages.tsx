import { ShortLink } from "../types";

export function Layout({
  title,
  children,
  activeTab,
}: {
  title: string;
  children: any;
  activeTab: "links" | "create" | "edit";
}) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title} | Refer Link Manager</title>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --bg-primary: #080b11;
            --bg-secondary: #0f131a;
            --bg-card: rgba(17, 22, 34, 0.7);
            --border-color: rgba(255, 255, 255, 0.06);
            --border-hover: rgba(255, 255, 255, 0.12);
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --text-muted: #64748b;
            --accent-primary: #8b5cf6;
            --accent-primary-rgb: 139, 92, 246;
            --accent-secondary: #06b6d4;
            --accent-secondary-rgb: 6, 182, 212;
            --accent-success: #10b981;
            --accent-danger: #f43f5e;
            --glow-color: rgba(139, 92, 246, 0.15);
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            background-color: var(--bg-primary);
            background-image: 
              radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.12) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.08) 0px, transparent 50%);
            color: var(--text-primary);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            overflow-x: hidden;
          }

          /* Header / Navigation */
          header {
            background: rgba(8, 11, 17, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid var(--border-color);
            position: sticky;
            top: 0;
            z-index: 100;
          }

          .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo-link {
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .logo {
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 24px;
            background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
          }

          .nav-menu {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .nav-item {
            text-decoration: none;
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 14px;
            padding: 8px 16px;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .nav-item:hover {
            color: var(--text-primary);
            background: rgba(255, 255, 255, 0.03);
          }

          .nav-item.active {
            color: var(--text-primary);
            background: rgba(139, 92, 246, 0.15);
            border: 1px solid rgba(139, 92, 246, 0.2);
          }

          .user-badge {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: var(--text-muted);
            background: rgba(255, 255, 255, 0.02);
            padding: 6px 12px;
            border-radius: 9999px;
            border: 1px solid var(--border-color);
          }

          .user-badge svg {
            width: 14px;
            height: 14px;
          }

          /* Layout Main Content */
          main {
            flex: 1;
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            padding: 40px 24px;
          }

          /* Cards */
          .card {
            background: var(--bg-card);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
            transition: border-color 0.2s, transform 0.2s;
          }

          .card:hover {
            border-color: var(--border-hover);
          }

          /* Buttons */
          .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 14px;
            padding: 10px 18px;
            border-radius: 10px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
          }

          .btn-primary {
            background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-primary-hover, #7c3aed) 100%);
            color: white;
            box-shadow: 0 4px 14px 0 rgba(139, 92, 246, 0.3);
          }

          .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px 0 rgba(139, 92, 246, 0.4);
          }

          .btn-secondary {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
          }

          .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: var(--border-hover);
          }

          .btn-danger {
            background: rgba(244, 63, 94, 0.1);
            border: 1px solid rgba(244, 63, 94, 0.2);
            color: var(--accent-danger);
          }

          .btn-danger:hover {
            background: rgba(244, 63, 94, 0.2);
            border-color: rgba(244, 63, 94, 0.3);
          }

          .btn-icon {
            padding: 8px;
            border-radius: 8px;
          }

          .btn-success {
            background: rgba(16, 185, 129, 0.15) !important;
            border-color: rgba(16, 185, 129, 0.3) !important;
            color: var(--accent-success) !important;
          }

          /* Form styles */
          .form-group {
            margin-bottom: 20px;
          }

          .form-label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-secondary);
            margin-bottom: 8px;
          }

          .form-control {
            width: 100%;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 12px 16px;
            font-family: 'Inter', sans-serif;
            font-size: 15px;
            color: var(--text-primary);
            transition: all 0.2s ease;
          }

          .form-control:focus {
            outline: none;
            border-color: var(--accent-primary);
            box-shadow: 0 0 0 4px var(--glow-color);
            background: rgba(0, 0, 0, 0.3);
          }

          .form-control::placeholder {
            color: var(--text-muted);
          }

          .form-help {
            display: block;
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 6px;
          }

          .prefix-input-group {
            display: flex;
            align-items: center;
          }

          .input-prefix {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-color);
            border-right: none;
            padding: 12px 14px;
            font-size: 14px;
            color: var(--text-muted);
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            user-select: none;
          }

          .prefix-input-group .form-control {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }

          /* Alert / Notification box */
          .alert {
            padding: 16px 20px;
            border-radius: 12px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
          }

          .alert-success {
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid rgba(16, 185, 129, 0.2);
            color: #34d399;
          }

          .alert-error {
            background: rgba(244, 63, 94, 0.1);
            border: 1px solid rgba(244, 63, 94, 0.2);
            color: #fb7185;
          }

          /* Footer */
          footer {
            margin-top: auto;
            border-top: 1px solid var(--border-color);
            padding: 24px;
            text-align: center;
            font-size: 13px;
            color: var(--text-muted);
          }

          footer a {
            color: var(--text-secondary);
            text-decoration: none;
          }

          footer a:hover {
            color: var(--text-primary);
          }

          /* Iconsax / SVG sizing */
          .icon {
            width: 18px;
            height: 18px;
            flex-shrink: 0;
          }

          /* Toast style for notifications */
          #toast-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 9999;
            pointer-events: none;
          }

          .toast {
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: #fff;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 14px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: auto;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .toast.show {
            transform: translateY(0);
            opacity: 1;
          }

          .toast-error {
            border-left: 4px solid var(--accent-danger);
          }

          /* Responsive Media Queries */
          @media (max-width: 768px) {
            .nav-container {
              flex-direction: column;
              gap: 12px;
              padding: 12px 16px;
              align-items: stretch;
            }

            .logo-link {
              justify-content: center;
              margin-bottom: 4px;
            }

            .nav-menu {
              justify-content: center;
              flex-wrap: wrap;
              gap: 6px;
              width: 100%;
            }

            .nav-item {
              flex: 1;
              text-align: center;
              padding: 10px 12px;
              font-size: 13px;
            }

            .user-badge {
              display: none;
            }

            main {
              padding: 24px 16px;
            }

            /* Responsive Table -> Cards transformation */
            .table-card {
              background: transparent;
              border: none;
              box-shadow: none;
            }

            table, thead, tbody, th, td, tr {
              display: block;
              width: 100%;
            }

            thead {
              display: none; /* Hide table headers on mobile */
            }

            tr {
              background: var(--bg-card);
              border: 1px solid var(--border-color);
              border-radius: 16px;
              margin-bottom: 16px;
              padding: 16px;
              box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              transition: border-color 0.2s, transform 0.2s;
            }

            tr:hover {
              border-color: var(--border-hover);
            }

            td {
              padding: 10px 0;
              border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
              display: flex;
              justify-content: space-between;
              align-items: center;
              vertical-align: middle;
            }

            td:first-child {
              padding-top: 0;
              border-bottom: 1px solid var(--border-color);
              padding-bottom: 12px;
              margin-bottom: 8px;
              display: block; /* Let title layout stack naturally */
            }

            td:first-child::before {
              display: none; /* Don't show label for the title */
            }

            td:last-child {
              border-bottom: none;
              padding-bottom: 0;
              padding-top: 14px;
              justify-content: flex-end;
            }

            td::before {
              content: attr(data-label);
              font-size: 12px;
              font-weight: 600;
              color: var(--text-muted);
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .destination-url-container {
              max-width: 180px; /* Squeeze target url container on mobile */
              text-align: right;
            }

            /* Adjust search and actions layout on mobile */
            .actions-bar {
              flex-direction: column;
              align-items: stretch;
              gap: 12px;
            }

            .search-wrapper {
              max-width: 100%;
              width: 100%;
            }

            .actions-bar .btn-primary {
              width: 100%;
            }

            /* Forms styling on mobile */
            .form-card {
              padding: 16px;
            }

            .btn-group {
              flex-direction: column;
              gap: 10px;
            }

            .btn-group .btn {
              width: 100%;
            }
            
            .input-prefix {
              font-size: 12px;
              padding: 12px 8px;
              max-width: 110px;
            }
          }
        `,
          }}
        />
      </head>
      <body>
        <header>
          <div className="nav-container">
            <a href="/dashboard" className="logo-link">
              <span className="logo">Refer 🔗</span>
            </a>
            <div className="nav-menu">
              <a
                href="/dashboard"
                className={`nav-item ${activeTab === "links" ? "active" : ""}`}
              >
                Saved Links
              </a>
              <a
                href="/dashboard/create"
                className={`nav-item ${activeTab === "create" ? "active" : ""}`}
              >
                Create Link
              </a>
              <div className="user-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
                Admin
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer>
          <p>
            &copy; {new Date().getFullYear()} Refer. Powered by Hono &amp;
            Cloudflare KV.
          </p>
        </footer>

        <div id="toast-container"></div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
          // Client-side Toast system
          window.showToast = function(message, type = 'success') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = 'toast toast-' + type;
            
            // Icon selection
            const iconSvg = type === 'success' 
              ? '<svg class="icon" style="color:var(--accent-success)" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
              : '<svg class="icon" style="color:var(--accent-danger)" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

            toast.innerHTML = iconSvg + '<span>' + message + '</span>';
            container.appendChild(toast);
            
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
              toast.classList.remove('show');
              setTimeout(() => toast.remove(), 300);
            }, 3500);
          }
        `,
          }}
        />
      </body>
    </html>
  );
}

export function DashboardPage({
  links,
  hostUrl,
  successMessage,
}: {
  links: ShortLink[];
  hostUrl: string;
  successMessage?: string;
}) {
  // Compute dashboard stats
  const totalLinks = links.length;
  const totalClicks = links.reduce(
    (sum, link) => sum + (link.metadata.clicks || 0),
    0,
  );

  return (
    <Layout title="Dashboard" activeTab="links">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
        }

        .stat-card.links::before { background: var(--accent-primary); }
        .stat-card.clicks::before { background: var(--accent-secondary); }

        .stat-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-family: 'Outfit', sans-serif;
          font-size: 36px;
          font-weight: 800;
          line-height: 1.1;
        }

        /* Search & Actions Bar */
        .actions-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .search-wrapper {
          position: relative;
          flex: 1;
          max-width: 400px;
          min-width: 250px;
        }

        .search-wrapper .icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          padding-left: 44px;
        }

        /* Table Design */
        .table-card {
          padding: 0;
          overflow: hidden;
        }

        .table-responsive {
          overflow-x: auto;
          width: 100%;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        th {
          background: rgba(255, 255, 255, 0.01);
          color: var(--text-secondary);
          font-weight: 600;
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-color);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        td {
          padding: 18px 24px;
          border-bottom: 1px solid var(--border-color);
          vertical-align: middle;
        }

        tr {
          transition: background-color 0.2s ease, opacity 0.2s ease;
        }

        tr:last-child td {
          border-bottom: none;
        }

        tr:hover {
          background-color: rgba(255, 255, 255, 0.015);
        }

        .col-label-text {
          font-weight: 600;
          color: var(--text-primary);
          display: block;
        }

        .col-date-text {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 4px;
          display: block;
        }

        .link-badge-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .short-link-href {
          color: var(--accent-secondary);
          text-decoration: none;
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          transition: color 0.15s ease;
        }

        .short-link-href:hover {
          color: #22d3ee;
          text-decoration: underline;
        }

        .btn-copy-small {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 6px;
          border-radius: 6px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-copy-small:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
          border-color: var(--border-hover);
        }

        .destination-url-container {
          max-width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: var(--text-secondary);
          font-size: 13px;
        }

        .destination-url-container a {
          color: inherit;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .destination-url-container a:hover {
          color: var(--text-primary);
        }

        .click-badge {
          background: rgba(6, 182, 212, 0.1);
          color: var(--accent-secondary);
          border: 1px solid rgba(6, 182, 212, 0.2);
          padding: 4px 10px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 12px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .click-badge svg {
          width: 12px;
          height: 12px;
        }

        .actions-cell {
          display: flex;
          gap: 6px;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 32px;
          text-align: center;
        }

        .empty-illustration {
          width: 80px;
          height: 80px;
          color: var(--text-muted);
          margin-bottom: 20px;
          opacity: 0.6;
        }

        .empty-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 20px;
          margin-bottom: 8px;
        }

        .empty-desc {
          color: var(--text-secondary);
          max-width: 380px;
          margin-bottom: 24px;
          font-size: 14px;
        }
      `,
        }}
      />

      {successMessage && (
        <div className="alert alert-success">
          <svg
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {successMessage}
        </div>
      )}

      {/* Stats Summary */}
      <div className="stats-grid">
        <div className="card stat-card links">
          <div className="stat-title">Total Links</div>
          <div className="stat-value" id="stat-total-links">
            {totalLinks}
          </div>
        </div>
        <div className="card stat-card clicks">
          <div className="stat-title">Total Redirects</div>
          <div className="stat-value" id="stat-total-clicks">
            {totalClicks}
          </div>
        </div>
      </div>

      {/* Search & Action Panel */}
      <div className="actions-bar">
        <div className="search-wrapper">
          <svg
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            id="search-input"
            className="form-control search-input"
            placeholder="Search code, label, or destination URL..."
          />
        </div>
        <a href="/dashboard/create" className="btn btn-primary">
          <svg
            className="icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Link
        </a>
      </div>

      {/* Main Table */}
      <div className="card table-card">
        {totalLinks === 0 ? (
          <div className="empty-state">
            <svg
              className="empty-illustration"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            <div className="empty-title">No Links Shortened Yet</div>
            <p className="empty-desc">
              Create your first link redirects for affiliate links, personal
              urls, campaigns, and track click counts!
            </p>
            <a href="/dashboard/create" className="btn btn-primary">
              Shorten a URL
            </a>
          </div>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Info / Label</th>
                  <th>Short Code</th>
                  <th>Destination URL</th>
                  <th>Clicks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => {
                  const shortUrl = `${hostUrl}/${link.code}`;
                  const createdDate = link.metadata.createdAt
                    ? new Date(link.metadata.createdAt).toLocaleDateString(
                        undefined,
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )
                    : "N/A";
                  return (
                    <tr id={`row-${link.code}`} key={link.code}>
                      <td className="col-label" data-label="Info / Label">
                        <span className="col-label-text">
                          {link.metadata.label || "Untitled Redirect"}
                        </span>
                        <span className="col-date-text">
                          Created: {createdDate}
                        </span>
                      </td>
                      <td className="col-code" data-label="Short Code">
                        <div className="link-badge-container">
                          <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="short-link-href"
                          >
                            /{link.code}
                          </a>
                          {/* @ts-ignore */}
                          <button
                            type="button"
                            className="btn-copy-small"
                            title="Copy Short Link"
                            onclick={`copyToClipboard(this, '${shortUrl}')`}
                          >
                            <svg
                              className="icon"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="col-dest" data-label="Destination URL">
                        <div
                          className="destination-url-container"
                          title={link.originalUrl}
                        >
                          <a
                            href={link.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.originalUrl}
                          </a>
                        </div>
                      </td>
                      <td data-label="Clicks">
                        <span className="click-badge">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          <span className="click-badge-val">
                            {link.metadata.clicks || 0}
                          </span>
                        </span>
                      </td>
                      <td className="actions-cell" data-label="Actions">
                        <a
                          href={`/dashboard/edit/${link.code}`}
                          className="btn btn-secondary btn-icon"
                          title="Edit Redirect URL"
                        >
                          <svg
                            className="icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </a>
                        {/* @ts-ignore */}
                        <button
                          type="button"
                          className="btn btn-danger btn-icon"
                          title="Delete Link"
                          onclick={`deleteLink('${link.code}')`}
                        >
                          <svg
                            className="icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Empty Search State */}
            <div
              id="search-empty-state"
              className="empty-state"
              style={{ display: "none" }}
            >
              <svg
                className="empty-illustration"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="empty-title">No Matches Found</div>
              <p className="empty-desc">
                No shortened links match your current search query. Try
                searching for something else!
              </p>
            </div>
          </div>
        )}
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
        // Helper copy client logic
        async function copyToClipboard(button, text) {
          try {
            await navigator.clipboard.writeText(text);
            const originalHtml = button.innerHTML;
            button.innerHTML = '<svg class="icon" style="color:var(--accent-success)" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
            button.classList.add('btn-success');
            showToast('Copied link to clipboard!');
            setTimeout(() => {
              button.innerHTML = originalHtml;
              button.classList.remove('btn-success');
            }, 2000);
          } catch (err) {
            console.error(err);
            showToast('Failed to copy to clipboard', 'error');
          }
        }

        // Helper delete client logic
        async function deleteLink(code) {
          if (confirm('Are you sure you want to delete the short code /' + code + '?')) {
            try {
              const res = await fetch('/dashboard/delete/' + code, {
                method: 'POST'
              });
              if (res.ok) {
                showToast('Link /' + code + ' deleted successfully.');
                const row = document.getElementById('row-' + code);
                if (row) {
                  row.style.opacity = '0';
                  row.style.transform = 'translateY(12px)';
                  setTimeout(() => {
                    row.remove();
                    
                    // Re-calculate statistics
                    const rows = document.querySelectorAll('tbody tr:not([style*="display: none"])');
                    const totalLinksCount = document.querySelectorAll('tbody tr').length;
                    const linksStat = document.getElementById('stat-total-links');
                    if (linksStat) linksStat.textContent = totalLinksCount;
                    
                    let totalClicks = 0;
                    document.querySelectorAll('.click-badge-val').forEach(span => {
                      totalClicks += parseInt(span.textContent || '0', 10);
                    });
                    const clicksStat = document.getElementById('stat-total-clicks');
                    if (clicksStat) clicksStat.textContent = totalClicks;

                    if (totalLinksCount === 0) {
                      location.reload(); // Quick refresh to render full empty state view
                    }
                  }, 300);
                }
              } else {
                showToast('Failed to delete link.', 'error');
              }
            } catch (err) {
              console.error(err);
              showToast('An error occurred during deletion.', 'error');
            }
          }
        }

        // Live Search logic
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const rows = document.querySelectorAll('tbody tr');
            let matchCount = 0;
            
            rows.forEach(row => {
              const label = row.querySelector('.col-label')?.textContent.toLowerCase() || '';
              const code = row.querySelector('.col-code')?.textContent.toLowerCase() || '';
              const dest = row.querySelector('.col-dest')?.textContent.toLowerCase() || '';
              
              if (label.includes(query) || code.includes(query) || dest.includes(query)) {
                row.style.display = '';
                row.style.opacity = '1';
                matchCount++;
              } else {
                row.style.display = 'none';
                row.style.opacity = '0';
              }
            });

            const emptyState = document.getElementById('search-empty-state');
            if (emptyState) {
              emptyState.style.display = (matchCount === 0 && rows.length > 0) ? 'flex' : 'none';
            }
          });
        }
      `,
        }}
      />
    </Layout>
  );
}

export function CreatePage({
  hostUrl,
  errorMessage,
}: {
  hostUrl: string;
  errorMessage?: string;
}) {
  return (
    <Layout title="Create Short Link" activeTab="create">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .form-card {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-header {
          margin-bottom: 28px;
        }

        .form-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 24px;
          margin-bottom: 6px;
        }

        .form-desc {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .btn-group {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }
      `,
        }}
      />

      <div className="card form-card">
        <div className="form-header">
          <h2 className="form-title">Create Short Link</h2>
          <p className="form-desc">
            Define a new short redirect. Fill in the original URL and optional
            details.
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-error">
            <svg
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errorMessage}
          </div>
        )}

        <form action="/dashboard/create" method="POST" id="create-form">
          <div className="form-group">
            <label className="form-label" htmlFor="originalUrl">
              Destination URL *
            </label>
            <input
              type="url"
              name="originalUrl"
              id="originalUrl"
              className="form-control"
              placeholder="https://example.com/products/affiliate-id"
              required
            />
            <span className="form-help">
              The long URL where visitors will be redirected.
            </span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="code">
              Custom Short Code (Optional)
            </label>
            <input
              type="text"
              name="code"
              id="code"
              className="form-control"
              placeholder="e.g. summer-sale"
              pattern="^[a-zA-Z0-9-_]+$"
              title="Only letters, numbers, dashes, and underscores are allowed."
            />
            <span className="form-help">
              Leave blank to auto-generate a secure 6-character short code.
            </span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="label">
              Friendly Label / Description (Optional)
            </label>
            <input
              type="text"
              name="label"
              id="label"
              className="form-control"
              placeholder="e.g. Summer Promo Affiliate Link"
            />
            <span className="form-help">
              A reference label to help you find this link on your dashboard.
            </span>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              <svg
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              Generate Short Link
            </button>
            <a href="/dashboard" className="btn btn-secondary">
              Cancel
            </a>
          </div>
        </form>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `

        // Add visual loading state on submit
        const form = document.getElementById('create-form');
        if (form) {
          form.addEventListener('submit', () => {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
              submitBtn.disabled = true;
              submitBtn.innerHTML = '<svg class="icon animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3m0 0l3 3m-3-3v8" /></svg> Generating...';
            }
          });
        }
      `,
        }}
      />
    </Layout>
  );
}

export function EditPage({
  link,
  hostUrl,
  errorMessage,
}: {
  link: ShortLink;
  hostUrl: string;
  errorMessage?: string;
}) {
  return (
    <Layout title={`Edit Link /${link.code}`} activeTab="edit">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .form-card {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-header {
          margin-bottom: 28px;
        }

        .form-title {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 24px;
          margin-bottom: 6px;
        }

        .form-desc {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .btn-group {
          display: flex;
          gap: 12px;
          margin-top: 28px;
        }
      `,
        }}
      />

      <div className="card form-card">
        <div className="form-header">
          <h2 className="form-title">Edit Short Link</h2>
          <p className="form-desc">
            Modify the destination URL or label for the short code{" "}
            <strong>/{link.code}</strong>.
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-error">
            <svg
              className="icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errorMessage}
          </div>
        )}

        <form
          action={`/dashboard/edit/${link.code}`}
          method="POST"
          id="edit-form"
        >
          <div className="form-group">
            <label className="form-label">Short Link (Read-Only)</label>
            <input
              type="text"
              className="form-control"
              value={link.code}
              disabled
              readOnly
            />
            <span className="form-help">
              The short code cannot be modified once created.
            </span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="originalUrl">
              New Destination URL *
            </label>
            <input
              type="url"
              name="originalUrl"
              id="originalUrl"
              className="form-control"
              value={link.originalUrl}
              placeholder="https://example.com/products/affiliate-id"
              required
            />
            <span className="form-help">
              Enter the new target location for this short redirect.
            </span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="label">
              Friendly Label / Description (Optional)
            </label>
            <input
              type="text"
              name="label"
              id="label"
              className="form-control"
              value={link.metadata.label || ""}
              placeholder="e.g. Summer Promo Affiliate Link"
            />
            <span className="form-help">
              Update the reference label for your dashboard links view.
            </span>
          </div>

          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              <svg
                className="icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Changes
            </button>
            <a href="/dashboard" className="btn btn-secondary">
              Cancel
            </a>
          </div>
        </form>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `

        // Add visual loading state on submit
        const form = document.getElementById('edit-form');
        if (form) {
          form.addEventListener('submit', () => {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
              submitBtn.disabled = true;
              submitBtn.innerHTML = '<svg class="icon animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3m0 0l3 3m-3-3v8" /></svg> Saving...';
            }
          });
        }
      `,
        }}
      />
    </Layout>
  );
}
