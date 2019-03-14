workflow "Run CI on push" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Install dependencies" {
  uses = "nuxt/actions-yarn@node-11"
  args = "install"
}

action "Test" {
  needs = "Install dependencies"
  uses = "nuxt/actions-yarn@node-11"
  args = "test"
}

action "Lint" {
  uses = "nuxt/actions-yarn@node-11"
  needs = ["Install dependencies"]
  args = "lint"
}
