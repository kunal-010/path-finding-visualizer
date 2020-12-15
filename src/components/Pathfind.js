import React, { useState, useEffect } from 'react';
import Astar from '../astarAlgorithm/astar'
import Node from './Node'
import "bootswatch/dist/lux/bootstrap.min.css";
import './Pathfind.css'

const rows = 10;
const cols = 25;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;
const val = 1;

const Pathfind = () => {
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [VisitedNodes, setVisited] = useState([]);

    useEffect(() => {
        initialiseGrid();
    }, []);

    // create grid
    const initialiseGrid = () => {
        const grid = new Array(rows);

        for (let i = 0; i < rows; ++i) {
            grid[i] = new Array(cols);
        }

        createSpot(grid);

        setGrid(grid);

        addNeighbours(grid);

        getStartNode();
        getEndNode();

        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const endNode = grid[NODE_END_ROW][NODE_END_COL];
        let path;
        if (val === 1) {
            path = Astar(startNode, endNode);
        }
        startNode.isWall = false;
        endNode.isWall = false;
        if (path === "no path found") {
            alert("No Path Found");
            return;
        }
        setPath(path.path);

        setVisited(path.visited);
    };

    const getStartNode = () => {

    };

    const getEndNode = () => {

    };

    // create spot
    const createSpot = (grid) => {
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                grid[i][j] = new Spot(i, j);
            }
        }
    };

    // add neighbours 
    const addNeighbours = (grid) => {
        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < cols; ++j) {
                grid[i][j].addneighbours(grid);
            }
        }
    }

    // spot constructor
    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.g = 0;
        this.f = 0;
        this.h = 0;
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
        this.neighbours = [];
        this.isWall = false;
        if (Math.random(1) < 0.2) {
            this.isWall = true;
        }
        this.previous = undefined;
        this.addneighbours = function (grid) {
            let i = this.x;
            let j = this.y;
            if (i > 0) this.neighbours.push(grid[i - 1][j]);
            if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
            if (j > 0) this.neighbours.push(grid[i][j - 1]);
            if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
        };

    }

    // create grid with node
    const gridwithNode = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="rowWrapper">
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd, isWall } = col;
                            return (
                                <Node key={colIndex} isStart={isStart} isEnd={isEnd} row={rowIndex} col={colIndex} isWall={isWall}></Node>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )

    const visualzeShortestPath = (shortestPath) => {
        for (let i = 0; i < shortestPath.length; ++i) {
            setTimeout((
                () => {
                    const node = shortestPath[i];
                    document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
                }
            ), 20 * i);
        }
    }

    const visualizePath = () => {
        for (let i = 0; i <= VisitedNodes.length; ++i) {
            if (i === VisitedNodes.length) {
                setTimeout((
                    () => {
                        visualzeShortestPath(Path);
                    }
                ), 10 * i);
            } else {
                setTimeout((
                    () => {
                        const node = VisitedNodes[i];
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
                    }
                ), 10 * i);
            }
        }
    }

    console.log(Path);

    return (
        <div className="Wrapper">
            <div class="btn-group-horizontal">
                <button type="button" class="btn btn-primary">Button</button>
                <button type="button" class="btn btn-primary">Button</button>
                <button type="button" class="btn btn-primary">Button</button>
                <button type="button" class="btn btn-primary">Button</button>
                <button type="button" class="btn btn-primary">Button</button>
                <button type="button" class="btn btn-primary">Button</button>
            </div>
            <button className="buttn" onClick={visualizePath}>Visualize path</button>
            <h1>Astar Algorithm</h1>
            {gridwithNode}
        </div>
    )
};

export default Pathfind;