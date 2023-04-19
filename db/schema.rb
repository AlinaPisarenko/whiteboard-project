ActiveRecord::Schema[7.0].define(version: 2022_07_04_161943) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "projects", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "whiteboard"
    t.bigint "user_id"
    t.bigint "team_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_projects_on_team_id"
    t.index ["user_id"], name: "index_projects_on_user_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "content"
    t.index ["project_id"], name: "index_reviews_on_project_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "members", default: [], array: true
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "username"
    t.string "password_digest"
    t.string "email"
    t.string "profile_img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "team_id"
  end

end
