const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const files = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .map(f => f.trim().replace(/\\/g, "/"))
  .filter(f => f && fs.existsSync(f) && fs.statSync(f).isFile());

console.log("Total git tracked files:", files.length);

const batches = {
  batch1_root_docs: [],
  batch2_packages: [],
  batch3_api: [],
  batch4_storefront_marketing: [],
  batch5_admin_theme: [],
  batch6_omnishop: [],
  batch7_k8s_workflows: []
};

for (const f of files) {
  if (f.startsWith("packages/")) {
    batches.batch2_packages.push(f);
  } else if (f.startsWith("apps/api/")) {
    batches.batch3_api.push(f);
  } else if (f.startsWith("apps/storefront/") || f.startsWith("apps/web-marketing/")) {
    batches.batch4_storefront_marketing.push(f);
  } else if (f.startsWith("apps/admin/") || f.startsWith("apps/theme-editor/")) {
    batches.batch5_admin_theme.push(f);
  } else if (f.startsWith("apps/omnishop/")) {
    batches.batch6_omnishop.push(f);
  } else if (f.startsWith("k8s/") || f.startsWith(".github/")) {
    batches.batch7_k8s_workflows.push(f);
  } else {
    batches.batch1_root_docs.push(f);
  }
}

for (const [k, v] of Object.entries(batches)) {
  console.log(k, ":", v.length, "files");
  const payload = v.map(p => {
    let content;
    try {
      content = fs.readFileSync(p, "utf8");
    } catch {
      content = fs.readFileSync(p).toString("base64");
    }
    return { path: p, content };
  });
  fs.writeFileSync(`scratch/${k}.json`, JSON.stringify(payload, null, 2));
}
console.log("All batch payloads written to scratch/");
