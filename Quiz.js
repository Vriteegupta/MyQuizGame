class Quiz {
  constructor(){
    this.title = createElement('h1');
    this.greetings = createElement('h4');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");
    
    //write code to show a heading for showing the result of Quiz
    this.title.html("Result of Quiz");
    this.title.position(350,10);
    
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    if(allContestants !== undefined) {
      fill("blue");
      textSize(20);
      text("*NOTE: the contastant who answered correctly are highlighted in green.",130,230);
          for(var con in allContestants){
            if(allContestants !== undefined) {
              var corAns = "2";
              if(corAns === allContestants[con].answer){
                fill("green")
                textSize(25);
                text(allContestants[con].name+": "+allContestants[con].answer,300,300);
          }
          else {
              fill ("red");
              textSize(25);
              text(allContestants[con].name+": "+allContestants[con].answer,300,350);
            }
            if(contestant.index!==null) {
              contestant.update(); 
            }
          }
        }
      }
    }
  }
