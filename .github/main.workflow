workflow "Run CI on push" {
  on = "push"
  resolves = ["Lint", "Test", "Build Docs"]
}

action "If Docs Changed" {
  uses = "./actions/directory-filter"
  args = "docs"
}

action "Install dependencies" {
  uses = "nuxt/actions-yarn@node-10"
  args = "install"
}

action "Test" {
  needs = "Install dependencies"
  uses = "nuxt/actions-yarn@node-10"
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
