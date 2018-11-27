# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "M4C"
  spec.version       = "0.1.0"
  spec.authors       = ["emCog"]
  spec.email         = ["robin.leonard@gmail.com"]

  spec.summary       = "A custom theme designed and developed by emCog"
  spec.homepage      = "http://www.mindfulness4change.com"
  spec.license       = "Not licensed for sharing"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end
