const API_BASE =
  process.env.REACT_APP_SERVER_URL || 'https://api.keyvent.in';

const DEFAULT_BATCH_SIZE = 8;
const MAX_PER_FILE_BYTES = 10 * 1024 * 1024;
const MAX_RETRIES = 2;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function uploadOneBatch(batch, attempt = 0) {
  const formData = new FormData();
  batch.forEach((file) => formData.append('images', file));

  let res;
  try {
    res = await fetch(`${API_BASE}/api/upload`, {
      method: 'POST',
      body: formData,
    });
  } catch (networkErr) {
    if (attempt < MAX_RETRIES) {
      await sleep(500 * (attempt + 1));
      return uploadOneBatch(batch, attempt + 1);
    }
    throw new Error(
      'Network error during upload. Check your connection and try again.'
    );
  }

  if (res.status === 413) {
    throw new Error(
      'Server rejected the upload (413 Payload Too Large). Reduce image size or contact admin to raise the server limit.'
    );
  }

  if (res.status >= 500 && attempt < MAX_RETRIES) {
    await sleep(500 * (attempt + 1));
    return uploadOneBatch(batch, attempt + 1);
  }

  if (!res.ok) {
    let detail = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body && body.message) detail = body.message;
    } catch (_) {}
    throw new Error(`Upload failed: ${detail}`);
  }

  const json = await res.json();
  return json.images || [];
}

export async function uploadImages(files, opts = {}) {
  const list = Array.from(files || []);
  if (list.length === 0) return [];

  const oversized = list.filter((f) => f.size > MAX_PER_FILE_BYTES);
  if (oversized.length > 0) {
    throw new Error(
      `${oversized.length} file(s) exceed the 10MB per-file limit: ${oversized
        .map((f) => f.name)
        .slice(0, 3)
        .join(', ')}${oversized.length > 3 ? '...' : ''}`
    );
  }

  const batchSize = opts.batchSize || DEFAULT_BATCH_SIZE;
  const onProgress = typeof opts.onProgress === 'function' ? opts.onProgress : null;

  const urls = [];
  for (let i = 0; i < list.length; i += batchSize) {
    const batch = list.slice(i, i + batchSize);
    const batchUrls = await uploadOneBatch(batch);
    urls.push(...batchUrls);
    if (onProgress) {
      onProgress({
        uploaded: Math.min(i + batchSize, list.length),
        total: list.length,
      });
    }
  }
  return urls;
}
