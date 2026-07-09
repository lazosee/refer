export async function getShortCode(url: string): Promise<string> {
  // 1. Hash the URL using SHA-256
  const textEncoder = new TextEncoder();
  const data = textEncoder.encode(url);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // 2. Take the first 5 bytes of the hash
  // 5 bytes (40 bits) provide enough entropy for a 6-character base62 string.
  // 2^40 (~1.1 trillion) is larger than 62^6 (~56 billion), ensuring good distribution
  // and minimizing collisions for a 6-character output.
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const bytesToUse = hashArray.slice(0, 5);

  // 3. Convert these bytes to a single large integer
  let num = 0;
  for (let i = 0; i < bytesToUse.length; i++) {
    num = (num << 8) | bytesToUse[i];
  }

  // 4. Convert the integer to a base62 string of exactly 6 characters
  const ALPHABET =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const BASE = ALPHABET.length; // 62

  let shortCode = "";
  for (let i = 0; i < 6; i++) {
    shortCode = ALPHABET[num % BASE] + shortCode;
    num = Math.floor(num / BASE);
  }
  return shortCode;
}
