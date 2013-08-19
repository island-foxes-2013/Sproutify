require 'spec_helper'

describe SearchController do
  describe '#search' do
    include SolrSpecHelper
    let(:user) {FactoryGirl.create(:user)}
    before { solr_setup }

    it "should respond nicely with valid params" do
      user.create_geocode(lat: 32.5, lng: -119.5)
      Sunspot.commit
      get :search, ulat: 32, ulng: -120, blat: 33, blng: -119, content_type: :json
      p response.body
    end
  end
end
