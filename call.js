var NativeInput = React.createClass({
  getInitialState: function() {
    return {
      value: null
    };
  },

  render: function() {
    return (
      <input type="text" value={this.state.value} onChange={this.handleChange} />
    );
  },

  handleChange: function(e) {
    this.setState({
      value: e.target.value
    });

    if (this.props.hasOwnProperty('onChange')) {
      this.props.onChange(e.target.value);
    }
  }
});

var SearchInput = React.createClass({
  render: function() {
    return (
      <div className="search-input">
        <NativeInput onChange={this.handleChange} />
        <button onClick={this.handleResult}>Search</button>
      </div>
    );
  },
  getInitialState: function() {
    return {
      term: null
    }
  },
  handleChange: function(term) {
    this.setState({
      term: term
    });
  },
  handleResult: function() {
    this.props.onClick(this.state.term);
  }
});

var SearchResultList = React.createClass({
  render: function() {
    return (
      <div className="search-output">
        {this.props.results.map(function(result) {
          return (
            <div key={result.imdbID} className="result">
              <img src={result.Poster} alt={result.Title}/>
              <div className="content">
                <h4>{result.Title}</h4>
                <p>{result.Plot}</p>
              </div>
            </div>
          );
        }, this)}
      </div>
    );
  }
});

ReactDOM.render(<NativeInput />, document.getElementById('Hank'));
ReactDOM.render(<SearchInput />, document.getElementById('George'));
ReactDOM.render(<SearchResultList />, document.getElementById('Fred'));