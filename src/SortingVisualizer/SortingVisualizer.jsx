import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimation, getBubbleSortAnimation, getHeapSortAnimation} from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#ff0080';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#00FF7F';

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
            height: getWindowDimensions('height') * .8,
            width: getWindowDimensions('width')/7.9,
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);

    }
    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i =0; i < this.state.width; i++){
            array.push(randomIntFromInterval(5, this.state.height));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        console.log(animations)
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    quickSort(){
        const animations = getQuickSortAnimation(this.state.array);
        console.log(animations)
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight, swap, colorOfBar] = animations[i];
            if(barTwoIdx === 'pivot'){
                const barOneStyle = arrayBars[barOneIdx].style;
                let color = PRIMARY_COLOR;
                let width = '5px'
                if(colorOfBar === 'primary'){
                    color = PRIMARY_COLOR;
                    width = '5px';
                }else{
                    color = 'yellow';
                    width = '10px';
                }
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barOneStyle.width = width;
                }, i * ANIMATION_SPEED_MS);
            }else{
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                let color = PRIMARY_COLOR;
                if(colorOfBar === 'primary'){
                    color = PRIMARY_COLOR;
                }else{
                    color = SECONDARY_COLOR
                }
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
                if(swap){
                    setTimeout(() => {
                        barOneStyle.height = `${barTwoHeight}px`;
                        barTwoStyle.height = `${barOneHeight}px`;
                    }, i * ANIMATION_SPEED_MS);
                }
                if(barOneStyle.backgroundColor === SECONDARY_COLOR || barTwoStyle.backgroundColor === SECONDARY_COLOR){
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }
            }
        }
    }

    heapSort(){
        const animations = getHeapSortAnimation(this.state.array);
        console.log(animations)
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight, swap, colorOfBar] = animations[i];
            if(barTwoIdx === null){
                const barOneStyle = arrayBars[barOneIdx].style;
                let color = PRIMARY_COLOR;
                if(colorOfBar === 'primary'){
                    color = PRIMARY_COLOR;
                }else{
                    color = SECONDARY_COLOR
                }
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                }, ((i * ANIMATION_SPEED_MS)*2));
            }else{
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                let color = PRIMARY_COLOR;
                if(colorOfBar === 'primary'){
                    color = PRIMARY_COLOR;
                }else{
                    color = SECONDARY_COLOR
                }
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, ((i * ANIMATION_SPEED_MS)*2));
                if(swap){
                    setTimeout(() => {
                        barOneStyle.height = `${barTwoHeight}px`;
                        barTwoStyle.height = `${barOneHeight}px`;
                    }, ((i * ANIMATION_SPEED_MS)*2));
                }
                if(barOneStyle.backgroundColor === SECONDARY_COLOR || barTwoStyle.backgroundColor === SECONDARY_COLOR){
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }
            }
            
        }
    }

    bubbleSort(){
        const animations = getBubbleSortAnimation(this.state.array);
        console.log(animations)
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight, swap, colorOfBar] = animations[i];
            if(barTwoIdx === null){
                const barOneStyle = arrayBars[barOneIdx].style;
                let color = PRIMARY_COLOR;
                if(colorOfBar === 'primary'){
                    color = PRIMARY_COLOR;
                }else{
                    color = SECONDARY_COLOR
                }
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                }, (i * ANIMATION_SPEED_MS)/3);
            }else{
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                let color = PRIMARY_COLOR;
                if(colorOfBar === 'primary'){
                    color = PRIMARY_COLOR;
                }else{
                    color = SECONDARY_COLOR
                }
                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, (i * ANIMATION_SPEED_MS)/3);
                if(swap){
                    setTimeout(() => {
                        barOneStyle.height = `${barTwoHeight}px`;
                        barTwoStyle.height = `${barOneHeight}px`;
                    }, (i * ANIMATION_SPEED_MS)/3);
                }
                if(barOneStyle.backgroundColor === SECONDARY_COLOR || barTwoStyle.backgroundColor === SECONDARY_COLOR){
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }
            }
            
        }
    }

    //open dropwdown
    showMenu(event) {
        event.preventDefault();
        
        if(this.state.showMenu){
            this.setState({
                showMenu: false,
              });
        }else{
            this.setState({
                showMenu: true,
              });
        }

        
      }

    render(){
        const {array} = this.state;

        return(
            <div className="array-container">
                <div className="menu">
                    <div><button onClick={()=>{this.resetArray()}} className="generateArray">New Array</button></div>
                    <div><button onClick={()=>{this.mergeSort()}} className="generateArray">Merge Sort</button></div>
                    <div><button onClick={() => {this.quickSort()}} className="generateArray">Quick Sort</button></div>
                    <div><button onClick={() => {this.bubbleSort()}} className="generateArray">Bubble Sort</button></div>
                    <div><button onClick={() => {this.heapSort()}}>Heap Sort</button></div>
                   {/* <div className="AlgoDropwDown">
                        <button onClick={this.showMenu} type="button">
                        Choose Algorithm
                        </button>
                        {
                        this.state.showMenu
                            ? (
                        <div className="dropdown-menu">
                            <button onClick={() => this.mergeSort()} type="button">Merge Sort</button>
                            <button onClick={() => {this.quickSort()}}>Quick Sort</button>
                            <button onClick={() => {this.heapSort()}}>Heap Sort</button>
                            <button onClick={() => {this.bubbleSort()}}>Bubble Sort</button>
                        </div>
                        )
                        : (
                          null
                        )}
                        </div>*/}
                </div>
                {array.map((value, idx) => {
                    return <div className="array-bar" key={idx} style={{height: `${value}px`}}>

                    </div>
                })}
            </div>
        )
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getWindowDimensions(whichOne) {
    const { innerWidth: width, innerHeight: height } = window;
    if(whichOne === 'height'){
        return height;
    }else{
        return width;
    }
  }