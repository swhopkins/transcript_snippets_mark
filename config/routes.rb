Rails.application.routes.draw do
  root to: "pages#home"

  resources :transcripts, only: [:create] do
    resources :snippets, only: [:index]
  end

  resources :snippets, only: [:update]
end
