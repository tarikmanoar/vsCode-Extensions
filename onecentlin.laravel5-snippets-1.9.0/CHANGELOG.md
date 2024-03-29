## 1.9.0

* Sync `Str` api to Laravel v7.x
* Add `Str::after`, `Str::afterLast`, `Str::ascii` ([@gentritabazi01](https://github.com/gentritabazi01) - [PR [#22](https://github.com/onecentlin/laravel5-snippets-vscode/issues/22)](https://github.com/onecentlin/laravel5-snippets-vscode/pull/22))

## 1.8.0

* Add `Str::plural` and `Str::limit` ([@wdog](https://github.com/wdog) - [PR [#19](https://github.com/onecentlin/laravel5-snippets-vscode/issues/19)](https://github.com/onecentlin/laravel5-snippets-vscode/pull/19))
* Fix syntax error View ::makeCompact ([#17](https://github.com/onecentlin/laravel5-snippets-vscode/issues/17))
* Add `Route::dispatch` and `Route::dispatchToRoute` ([#12](https://github.com/onecentlin/laravel5-snippets-vscode/issues/12))
* Rename VS Code extension name to `Laravel Snippets` in order to support for Laravel 5 and above version.

## 1.7.0

* Update Cache parameters using ttl instead of minutes ([@nicoeg](https://github.com/nicoeg)) - [PR [#16](https://github.com/onecentlin/laravel5-snippets-vscode/issues/16)](https://github.com/onecentlin/laravel5-snippets-vscode/pull/16)

## 1.6.0

* Added snippets for laravel collective form and html ([@mnshankar](https://github.com/mnshankar) - [PR [#10](https://github.com/onecentlin/laravel5-snippets-vscode/issues/10)](https://github.com/onecentlin/laravel5-snippets-vscode/pull/10))
* Changed increments to bigIncrements ([@sidvanvliet](https://github.com/sidvanvliet) - [PR [#15](https://github.com/onecentlin/laravel5-snippets-vscode/issues/15)](https://github.com/onecentlin/laravel5-snippets-vscode/pull/15))

## 1.5.0

Support new snippets for Laravel 5.6

* Add `Str::uuid` and `Str::orderedUuid`
* Add `Broadcast::channel`

Support new snippets for Laravel 5.5

* Add `Route::redirect`
* Add `Route::view`
* Add `Cache::lock` with `get`, `release`, `block`

## 1.4.0

* Add `Helper::dd` for `dd()` die and dump helper ([#8](https://github.com/onecentlin/laravel5-snippets-vscode/issues/8))
* Fix response format ([#5](https://github.com/onecentlin/laravel5-snippets-vscode/issues/5))

## 1.3.4

* Fix syntax for PSR2 ([@tradzero](https://github.com/tradzero) - [PR [#4](https://github.com/onecentlin/laravel5-snippets-vscode/issues/4)](https://github.com/onecentlin/laravel5-snippets-vscode/pull/4))
* Fix `Route` syntax issues.

## 1.3.3

* Added `Blueprint` type check to table update snippet. ([@thelfensdrfer](https://github.com/thelfensdrfer) - [PR [#3](https://github.com/onecentlin/laravel5-snippets-vscode/issues/3)](https://github.com/onecentlin/laravel5-snippets-vscode/pull/3))

## 1.3.2

* Add `$table->timestamps();` as defualt fields while creating table schema. ([#2](https://github.com/onecentlin/laravel5-snippets-vscode/issues/2))
* Fix snippets stop position.

## 1.3.1

* Add missing support in DB: `DB::table` ([#1](https://github.com/onecentlin/laravel5-snippets-vscode/issues/1))

## 1.3.0

* Support new snippets for Laravel 5.3 API Authentication ([Passport](https://laravel.com/docs/5.3/passport))
* Add missing support in Authentication: `Auth::guard`, `Auth::attempt`, `Auth::login`, `Auth::loginUsingId`, `Auth::viaRemember`, `Auth::routes`
