workflow "Run CI on push" {
  on = "push"
  resolves = ["Lint", "Test", "Build Docs"]
}

action "If Docs Changed" {
  uses = "./actions/directory-filter"
  args = "docs"
}

action "If Source Changed" {
  uses = "./actions/directory-filter"
  args = "src"
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

action "Build Docs" {
  uses = "nuxt/actions-yarn@node-10"
  needs = ["If Docs Changed"]
  args = "docs"
}
