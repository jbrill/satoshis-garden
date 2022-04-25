import './App.css';
import React from 'react';
import './index.css';
import { useRef, useState, useEffect } from 'react';
// import ForceGraph3D from "react-force-graph-3d";
import ForceGraph2D from "react-force-graph-2d";
import axios from "axios";
import { ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import theme from './theme';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


function RangeSlider(): React.ReactElement<any , any> {
  const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </React.Fragment>
  );
}


window.devicePixelRatio = 1; // use standard resolution in retina displays

// const data = fetch('https://raw.githubusercontent.com/jbrill/lightning-json-snapshot/master/graph_data_merged.json').json();

const PageLink = ({ data }) => {
  console.log(data)
  return(
    <div>
      <Typography color="primary" variant="h4">Satoshi's Garden</Typography>
      <Typography color="secondary" variant="subtitle1">A Lightning Network Visualizer</Typography>
      <Typography color="secondary" variant="overline">{data.nodes.length} NODES</Typography>
      <Typography color="secondary" variant="overline">{data.links.length} CHANNELS</Typography>
    </div>
  );
};

const GraphFilters = ({ data }) => {
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
  const filterButtonStyle = {
    marginRight: '2vw',
  }
  return(
    <div>
      <div style={divStyle}>
        <Typography color="primary" variant="caption">Filter Graph by Percentile | {data.nodes.length} Nodes Selected</Typography>
        <Button style={filterButtonStyle} variant="contained" color="secondary" size="small">More Filters</Button>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Typography color="primary" variant="overline">Node Capacity</Typography>
          <RangeSlider />
        </Grid>
        <Grid item xs={3}>
          <Typography color="primary" variant="overline">Node Centrality</Typography>
          <RangeSlider />
        </Grid>
        <Grid item xs={3}>
          <Typography color="primary" variant="overline">Number of Channels</Typography>
          <RangeSlider />
        </Grid>
        <Grid item xs={3}>
          <Typography color="primary" variant="overline">Number of Peers</Typography>
          <RangeSlider />
        </Grid>
      </Grid>
    </div>
  );
};

const FocusGraph = ({ data }) => {
  const fgRef = useRef();

  const distance = 5000;

  return (
    <div className="focus-graph-contain">
      <ForceGraph2D
        // ref={fgRef}
        graphData={data}
        nodeLabel={node => !node.score ? `${node.id}` : `${node.alias}: ${node.score}`}
        nodeValue={node => !node.percentile ? 1 : `${node.percentile}`}
        nodeColor={node => !node.score ? '#DDDDDD' : 'red'}
        onNodeClick={node => window.open(`https://1ml.com/node/${node.id}`, '_blank')}
        enableNavigationControls={false}
        backgroundColor="black"
        d3AlphaDecay={(0)}
        d3VelocityDecay={(0.08)}
        cooldownTime={(60000)}
        linkColor="#DDDDDD"
        linkVisibility={true}
        showNavInfo={true}
        linkDirectionalParticles={1}
      />
    </div>
  )
};

const BottomDescription = ({ data }) => {
  return(
    <div className="bottom-contain">
      <h1>
        <span>Red</span> nodes represent BOS Score nodes. Learn more about the BOS score <a href="https://lightningwiki.net/bos/" target="_blank">here</a>.
      </h1>
      <h1>
        <a
          href="
            https://1ml.com/node/039dc42f737b519d18278022d307196ee91fbaf586f68ac6c4eeeaa1ccbbf7c739
          "
          target="_blank"
        >Open a channel</a> with me.
      </h1>
    </div>
  );
};

const App = () => {
  const [nodes, setNodes] = useState();
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    setIsLoading(true);
    const response = axios.get(
      'https://raw.githubusercontent.com/jbrill/lightning-json-snapshot/master/graph_data_merged.json'
    ).then( (res) => {
      // console.log(res)
      setNodes(res.data);
      setChannels(res.data.links);
      setIsLoading(false);
    }).catch( (err) => {
      setNodes([]);
      setIsLoading(false);
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        {isLoading && <p>Loading data...</p>}
        {error && <p>An error occurred</p>}
        {nodes &&
          <div className="graph-contain">
              <PageLink class="test" data={nodes} />
              <GraphFilters data={nodes} />
              {/* <BottomDescription data={nodes} /> */}
              <FocusGraph class="focus-graph" data={nodes} />
            </div>}
      </React.Fragment>
    </ThemeProvider>
  );
}

export default App;
