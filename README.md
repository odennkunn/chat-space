# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
<!-- users tabel -->
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|
<!-- assosiation -->
- has_many :messages
- has_many :groups, through: :group_users

<!-- groups table -->
|Column|Type|Options|
|------|----|-------|
|group_name|text|null: false|
<!-- assosiation -->
- has_many :users, through: :group_users

<!--  groups_users table -->
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
<!-- assosiation -->
- belongs_to :group
- belongs_to :user

<!-- message table -->
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
<!-- assosiation -->
- belongs_to :group
- belongs_to :user

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
