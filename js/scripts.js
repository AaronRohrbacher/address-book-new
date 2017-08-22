function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}
function Address(type, street, city, state) {
  this.type = type;
  this.street = street;
  this.city = city;
  this.state = state;
}
Contact.prototype.fullName = function(){
  return this.firstName + ' ' + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.type + ": " + this.street + ", " + this.city + ", " + this.state;
}

//user interface logic
$(document).ready(function(){
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address addAddress">' +
                                '<div class="form-group">' +
                                  '<label for="new-type">Address type:</label>' +
                                  '<input type="text" class="form-control new-type">' +
                                '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });

  $('form#new-contact').submit(function(event){
    event.preventDefault();

    var inputtedFirstName = $('input#new-first-name').val();
    var inputtedLastName = $('input#new-last-name').val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);
    $(".new-address").each(function() {
      var userType = $(this).find("input.new-type").val();
      var userStreet = $(this).find("input.new-street").val();
      var userCity = $(this).find("input.new-city").val();
      var userState = $(this).find("input.new-state").val();

      var newAddress = new Address(userType, userStreet, userCity, userState);
      newContact.addresses.push(newAddress);
    });

    $('ul#contacts').append("<li><span class='contact'>" + newContact.fullName() + '</span></li>');
    $('input#new-first-name').val('');
    $('input#new-last-name').val('');
    $('input.new-type').val('');
    $('input.new-street').val('');
    $('input.new-city').val('');
    $('input.new-state').val('');

    $('.addAddress').remove();

    $('.contact').last().click(function(){
      $('#show-contact').show();
      $('#show-contact h2').text(newContact.firstName);
      $('.full-name').text(newContact.fullName());
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
  });
});
