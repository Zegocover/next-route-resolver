workflow "Run CI on push" {
  on = "push"
  resolves = ["Lint", "Test"]
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
