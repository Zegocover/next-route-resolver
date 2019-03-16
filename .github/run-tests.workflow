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
  args = "install"
}

action "Test" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["Install dependencies"]
  args = "test"
}

action "Lint" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["Install dependencies"]
  args = "lint"
}
