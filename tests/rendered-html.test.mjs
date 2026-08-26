import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://portfolio.example/", {
      headers: {
        accept: "text/html",
        host: "portfolio.example",
        "x-forwarded-host": "portfolio.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished portfolio homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<title>AI 产品运营作品集 \| HZ<\/title>/);
  assert.match(html, /把内容增长经验/);
  assert.match(html, /Beauty Creative Intelligence/);
  assert.match(html, /Model Decision Lab/);
  assert.match(html, /ÉLAN Research Workspace/);
  assert.match(html, /Every insight must be traceable\./);
  assert.match(html, /生成视觉仅用于作品集展示/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("emits absolute social metadata from the request host", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(
    html,
    /<meta property="og:image" content="https:\/\/portfolio\.example\/og\.png"/,
  );
  assert.match(
    html,
    /<meta name="twitter:image" content="https:\/\/portfolio\.example\/og\.png"/,
  );
  assert.doesNotMatch(html, /—|–/);
});
