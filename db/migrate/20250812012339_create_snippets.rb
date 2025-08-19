class CreateSnippets < ActiveRecord::Migration[7.1]
  def change
    create_table :snippets do |t|
      t.references :transcript, null: false, foreign_key: true
      t.float :start, null: false
      t.float :end, null: false
      t.text :text, null: false
      t.boolean :needs_review, null: false, default: false
      t.timestamps
    end
  end
end
