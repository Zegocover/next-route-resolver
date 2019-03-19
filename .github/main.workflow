workflow "Build documentation on docs changes" {
  on = "push"
  resolves = ["Build Docs"]
}

action "If Docs Changed" {
  uses = "AndrewIngram/actions-changed-paths-filter@v0.0.1"
  args = "docs"
}

action "Build Docs" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["If Docs Changed"]
  args = "docs"
}

workflow "Run CI on source changes" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "If Source Changed" {
  uses = "AndrewIngram/actions-changed-paths-filter@v0.0.1"
  args = "package.json .babelrc src"
}

action "Install dependencies" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["If Source Changed"]
  args = "install --frozen-lockfile"
}

action "Test" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["Install dependencies"]
  args = "test"
}

action "Lint" {
  uses = "gimenete/eslint-action@master"
  secrets = ["GITHUB_TOKEN"]
}
