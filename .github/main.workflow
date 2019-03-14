workflow "Run CI on push" {
  on = "push"
  resolves = ["Lint", "Test"]
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
