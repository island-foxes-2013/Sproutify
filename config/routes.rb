Sproutify::Application.routes.draw do
  
  match 'home' => 'home#index'
  resources :users, :only => [:new, :create]
  resources :sessions, only: [:new, :create, :destroy]

end
