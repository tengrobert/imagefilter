
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Dropzone from 'react-dropzone';
import request from 'superagent';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 50,
  },
    dropzone: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '200px',
    height: '200px',
    borderWidth: '2px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const imgsrc = 'https://pbs.twimg.com/profile_images/561740222308696067/Tc1sOlK0.jpeg';


class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      uploadedFile: null,
      uploadedFileUrl: '',
      uploadedFilepreview: null,
      staticfile: imgsrc,
      filter: '',
      monochrome_touch: false,
      oilpaint_touch: false,
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0].preview
    });
    this.handleImageUpload(files[0]);
    console.log('image upload');
    console.log(files[0].name);
    this.setState({uploadedFileUrl: files[0].name});
    this.setState({uploadedFilepreview: files[0].preview});
  }

  handleImageUpload (file) {
    request.put("http://localhost:3010/upload")
      .attach("image-file", file, file.name)
      .end(function (res) {
        console.log(res);
      });
  }
  monochrome = () => {
    if (!this.state.monochrome_touch) {
      let newfilter = this.state.filter;
      if (this.state.filter === '') newfilter = 'https://process.filestackapi.com/AcLn76pTnQGuBwMG7MeiJz/monochrome/';
      else newfilter += 'monochrome/';
      this.setState({ monochrome_touch: true, filter: newfilter });
    }
    else {
      let newfilter = this.state.filter;
      if (!this.state.oilpaint_touch) newfilter = '';
      else newfilter = 'https://process.filestackapi.com/AcLn76pTnQGuBwMG7MeiJz/oil_paint=amount:7/';
      this.setState({monochrome_touch: false, filter: newfilter});
    }

    let new_uploadedFileUrl = 'https://process.filestackapi.com/AcLn76pTnQGuBwMG7MeiJz/monochrome/' + this.state.staticfile;
    this.setState({staticfile: new_uploadedFileUrl});
  }
  oilpaint = () => {
    if (!this.state.oilpaint_touch) {
      let newfilter = this.state.filter;
      if (this.state.filter === '') newfilter = 'https://process.filestackapi.com/AcLn76pTnQGuBwMG7MeiJz/oil_paint=amount:7/';
      else newfilter += 'oil_paint=amount:7/';
      this.setState({ oilpaint_touch: true, filter: newfilter })
    }
    else {
      let newfilter = this.state.filter;
      if (!this.state.monochrome_touch) newfilter = '';
      else newfilter = 'https://process.filestackapi.com/AcLn76pTnQGuBwMG7MeiJz/monochrome/';
      this.setState({oilpaint_touch: false, filter: newfilter});
    }

    let new_uploadedFileUrl = 'https://process.filestackapi.com/AcLn76pTnQGuBwMG7MeiJz/oil_paint/' + this.state.staticfile;
    this.setState({staticfile: new_uploadedFileUrl});
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <h1>ImageFiltor</h1>
          <Dropzone
            style={styles.dropzone}          
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
          <img src={this.state.uploadedFilepreview} height="200" width="200"/>
            <img src={this.state.filter + imgsrc} height="200" width="200"/>
          <div>
            <RaisedButton label="monochrome" primary={true} onTouchTap={this.monochrome}/>
            <RaisedButton label="oilpaint" primary={true} onTouchTap={this.oilpaint}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
