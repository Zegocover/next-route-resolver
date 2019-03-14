workflow "Run tests" {
  on = "push"
  resolves = ["Tests"]
}

action "Tests" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "test"
}
