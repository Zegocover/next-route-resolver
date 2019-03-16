workflow "Run CI on push" {
  on = "push"
  resolves = ["Lint", "Test", "Build Docs"]
}

action "If Docs Changed" {
  uses = "./actions/directory-filter"
  args = "docs"
}

action "Install dependencies" {
  uses = "nuxt/actions-yarn@master"
  args = "install"
}

action "Test" {
  needs = "Install dependencies"
  uses = "nuxt/actions-yarn@master"
  args = "test"
}

action "Lint" {
  uses = "nuxt/actions-yarn@master"
  needs = ["Install dependencies"]
  args = "lint"
}

action "Build Docs" {
  uses = "nuxt/actions-yarn@master"
  needs = ["If Docs Changed"]
  args = "docs"
}
