source "https://rubygems.org"

# 使用 GitHub Pages 官方推荐的 jekyll-github-pages gem
gem "github-pages", group: :jekyll_plugins

# 如果您想使用特定版本的 Jekyll
# gem "jekyll", "~> 4.3.0"

# 如果您想使用其他主题
# gem "minima", "~> 2.5"

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-include-cache"
end

# Windows 和 JRuby 兼容性
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# 性能优化
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# 锁定 Ruby 版本（可选）
ruby "3.1.0"
