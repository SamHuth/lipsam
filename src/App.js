import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      loading: true
    };
    
  }
  
  componentDidMount(){
    setTimeout( () => {
      this.setState({loading: false})
    }, 4500);
  }
  
  render(){
    return(
      <div id="app">
        <div className="menu">
          <a href="#lipsam" className="alt">Lipsam</a>
          <a href="https://www.smhth.com/">Home</a>
        </div>
        <div id="app-inner">
          <div id="lipsam">
            { this.state.loading === true ? <Loading /> : <Lipsam />  }
          </div>
        </div>
      </div>
    );
  } 
  
}

class Lipsam extends React.Component{
  constructor(props){
    super(props)
    
    this.state = {
      lipsam: [],
    };
    
    this.generate = this.generate.bind(this);
    this.randomEntry = this.randomEntry.bind(this);
    this.copyText = this.copyText.bind(this);
  }
  
  randomEntry(array){
    return array[Math.floor(Math.random() * array.length) + 0];
  }
  

  copyText() {

    const copyText = document.querySelectorAll("#results p");
    let text = "";

    for( let i = 0; i < copyText.length; i++){
      text += copyText[i].innerHTML;
    }

    const copyBtn = document.getElementById('copybtn');

    navigator.clipboard.writeText(text).then(function() {
      copyBtn.innerHTML = 'Copied to clipboard!';
      setTimeout(
        () => {
          copyBtn.innerHTML = "Copy Everything!";
        }
        , 2000)

    }, function(err) {
      console.error('Async: Could not copy text: ', err);
      copyBtn.innerHTML = 'Not copied :(';

      setTimeout(
        () => {
          copyBtn.innerHTML = "Copy Everything!";
        }
        , 2000)

    });

  }

  generate(){
    
    let output = [];
    
    const quantitySent = document.getElementById('quantity-sent');
    const quantityPara = document.getElementById('quantity-para');
    
        
    const starts = ["Can you see", "I have", "Did you know", "What is", "How can", "Look out for the", "I cannot believe", "Woah, how about a", "Oh no, a", "Dont pay attention to the", "Once upon a time, a", "Theoretically speaking,", "Dont ever", "How could a", "My website has two", "When comparing bees and", "See more", "Zooming in on", "Yo bro! My", "Check this! A", "Why would a", "Tomorrow will have a 30% chance of", "Just think about"];
    
    const nouns = ["computer", "book", "grandma", "car", "boat", "shoe", "banana", "cat", "robot", "artificial intelligence", "ideas", "market", "basketball", "keyboard", "image", "webpage", "surfboard", "ants", "Bill Gates", "dirt", "television", "chicken", "fish"];
    
    const adjectives = ["red", "big", "invisible", "loud", "frozen", "funny", "placeholder", "evil", "slow", "loving", "horrible", "beautiful", "sexy", "dirty", "microscopic", "cool", "radical", "negative", "digital", "wet", "dumb", "gross", "enormous"];
    
    const endings = ["ate my homework.", "stole a chair.", "died.", "exploded instantly.", "ran away.", "just got added to the dictionary.", "destroyed the world.", "likes to party.", "cant open a jar.", "got lost in my washing.", "entering the shadow realm.", "look like that?", "turn out so bad?", "haunts my dreams.", "and thats how it ended.", "on the internet.", "but only on rainy days.", "- said no-one ever!!", "will be deleted from history.", "never happened?", "is controlled by aliens.", "but... Hmmm actually nevermind.", "and wear a mask."];
    
    let i;
    let j;
    
    for(i=0; i<quantityPara.value; i++){
      output[i] = [];
      for(j=0; j<quantitySent.value; j++){
        output[i][j] = `${this.randomEntry(starts)} ${this.randomEntry(adjectives)} ${this.randomEntry(nouns)} ${this.randomEntry(endings)}`;
      }
    }
    
    this.setState({'lipsam': output});
  }
  
  
  render(){
    return(
      <div className="lipsam-container">
        <h1 className="alt" >Lipsam</h1>
        <p>Lipsam is simply dummy text to the extreme. This complex algorithm utilises quantum computing techinques to simulate an Artificial Intelligence sorting format. From here it connects to Google, Facebook and Amazon to see what words are best suited for your project. All results are 100% tailored to your needs.</p>
        <p>Select below how many sentences and paragraphs you wish to copy. Use this tool at your own risk!</p>
        <label htmlFor="quantity-sent">No. of Sentences</label>
        <select id="quantity-sent" name="quantity-sent">
          <option value="1" defaultValue>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <br />
        <label htmlFor="quantity-para">No. of Paragraphs</label>
        <select id="quantity-para" name="quantity-para">
          <option value="1" defaultValue>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <br />
        <button className="alt" onClick={(e) => { this.generate(e) }}>Generate Lipsam</button>
        
        <div id="results">
          <Output lipsam={this.state.lipsam}/>
          {this.state.lipsam.length !== 0 ? (
            <div className="copy"><button id="copybtn" onClick={(e) => {this.copyText(e)} }>Copy everything!</button></div>
          ) : ""}
        </div>
      </div>
    );
  }
  
}

const Output = (props) => {  
  const paragraphs = props.lipsam.map( (para, key) => {
    return (
      <p key={key}>
        { para.join(' ') }
      </p>
      );
  });
    
  return (paragraphs)
}


class Loading extends React.Component {
  
  
  constructor(props){
    super(props)
    
    this.state = {
      words1: "",
      words2: "",
      words3: "",
      done: false,
    };
    this.getWords = this.getWords.bind(this);
  }
  
  componentDidMount(){
    
    this.setState({words1: this.getWords()});
      setTimeout( () => {
      this.setState({words2: this.getWords()});
    }, 1000);
      setTimeout( () => {
      this.setState({words3: this.getWords()});
    }, 1800);
    setTimeout( () => {
      this.setState({done: true});
    }, 2500);
  }

  getWords(){
    const loading = ["Loading","Generating","Calculating","Improvising","Authorising","Stealing","Deleting","Transpiling","Connecting","Downloading"];
    const feature = ["Viruses","Algorithms","Databases","Accounts","Sensitive Data","Keywords","Admin Access","Servers","Artificial Intelligence","Hacks"];

    return "✔ " + loading[Math.floor(Math.random() * loading.length) + 0] + " " + feature[Math.floor(Math.random() * feature.length) + 0];
    
  }
  
  render(){
      
    return(
      <div>
        <p className='spinner'>
          {this.state.done ? <b>Booting Sequence Complete</b> : <span></span>}
        </p>
        {this.state.done ? " " : (
          <ul>
            <li>{this.state.words1 ? this.state.words1 : ''}</li>
            <li>{this.state.words2 ? this.state.words2 : ''}</li>
            <li>{this.state.words3 ? this.state.words3 : ''}</li>
          </ul>
        )}
      </div>
    );
  }
};

export default App;