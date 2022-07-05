Rails.application.routes.draw do
  resources :reviews
  resources :projects
  resources :teams
  resources :users

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  delete "/logout", to: "sessions#destroy" 
  get "/me", to: "users#show"
  # Defines the root path route ("/")
  # root "articles#index"
    get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
