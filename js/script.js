$( function() {

  // id generator
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  function Column(name) {
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      // create components of columns
      var $column = $('<div>').addClass('column'),
          $columnHeader = $('<header>').addClass('column-header'),
          $columnTitle = $('<h2>').addClass('column-title').text(self.name),
          $columnCardList = $('<ul>').addClass('column-card-list'),
          $columnDelete = $('<button>').addClass('delete-column-btn').text('x'),
          $columnAddCard = $('<button>').addClass('add-card-btn').text('+');

      // events
      $columnDelete.click(function() {
        self.removeColumn();
      });
      $columnAddCard.click(function() {
        self.addCard(new Card(prompt("Enter the name of the card")));
      });

      // construct column
      $columnHeader.append($columnTitle)
                   .append($columnDelete);
                   
      $column.append($columnHeader)
             .append($columnAddCard)
             .append($columnCardList);
              
      // return ready column
      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  }

  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      // create components of cards
      var $card = $('<li>').addClass('card'),
          $cardDescription = $('<p>').addClass('card-description').text(self.description),
          $cardDelete = $('<button>').addClass('delete-card-btn').text('-');

      // events      
      $cardDelete.click(function(){
        self.removeCard();
      });

      // construct card
      $card.append($cardDescription)
           .append($cardDelete);

      return $card;
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  }

  var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  $('.add-column-btn').click(function() {
    var name = prompt('Enter a column name');
    var column = new Column(name);
        board.addColumn(column);
  });

  // CREATING COLUMNS
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

  // ADDING COLUMNS TO THE BOARD
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // CREATING CARDS
  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');

  // ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);

});