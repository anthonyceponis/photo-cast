import React, {useRef, useEffect, useState} from 'react';
import {Animated, Text, View, Image, Button} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle, TransformsStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

export const FadeInView: React.FC<FadeInViewProps> = props => { 
    //Export means this component can be accessed from other modules when imported
    //Const FadeInView defines a react native component called FadeInView
    //React.FC<FadeInViewProps> Defines the type of component to be a React Function Component. FadeInView props specified the kind of arguments to be passed in
    //We now refer to those arguments simply as "props"
    //We then define the function:

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  //Create a mutible variable "fadeAnim" that remains in the component
  //The variable references an instantiated class of "Animated.Value" which has sall the smoothing properties etc...
  //fadeAnim then refers to the current state of this referebce, so the object itself

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  //Function that runs every time that fadeAnim updates, which considering fadeAnim updates a lot...
  //Animated.timing is essentially a single step in the animation, then forcing useEffect to called again as
  //Animated.timing has the variable we want to update passed into it and the settings for how we want to update it
  //Calling .start on this completes the step.

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
  //We then return a special animated view (something that updates all the children too - hence the props are with kids)
  //We then include the children in the returned component
};

//My own attempts for a moving one

export interface ISlidePositions{startX: number, startY: number, endX: number, endY: number}
//Interface for specifiying a start and end position

type SlideInViewProps = PropsWithChildren<{style: ViewStyle, positions: ISlidePositions, prompt: boolean}>;
//Defines the arguments that SlideInView requires - The original style of the view (before translation),
//the start and end positions (off screen, on screen, for example) for the view,
//and a prompt the animation is tied to - a boolean that is updated (negated) by a button in the context where this view was created
//which will typically be the main app file -> we pass in the prompt which is global state from the previous context
//this variable is updated by a button (that is also in that context or has access to that state, like how this
//component now has acces to it)

export const SlideInView: React.FC<SlideInViewProps> = props => { 

  const slideAnimX = useRef(new Animated.Value(props.positions.startX)).current; //Returns reference to created object, the thing useRef is currently referncing - because references can of course change to other objects
  const slideAnimY = useRef(new Animated.Value(props.positions.startY)).current;
  //Creating mutable state for the current position of the element
  //These are used directly to translate the element in the returned style
  

  const ogEndX = props.positions.endX;
  const ogEndY = props.positions.endY;
  //props.positions.end is used as a "current target" for the element to reach
  //We keep these "og - original" positions for updating the current target position
  //End position = Slide in position
  //Done this way as the prop is mutable, const is not here.

  props.positions.endX = props.positions.startX;
  props.positions.endY = props.positions.startY;
  //To prevent the animation from moving at the start, we set the initial target position to the position
  //it's in already

  useEffect(() => {
    Animated.timing(slideAnimX, {
      toValue: props.positions.endX,
      duration: 5000, //Speed
      useNativeDriver: true,
    }).start();
    
  }, [slideAnimX]);
  //When slideAnimX changes (the useEffect() called when one of the things in the suffix array is changed) then we keep
  //animating it. Animated.timing().start() completes a step of the animation, and this change then causes the next change
  //In timing itself, we specify the animating variable we update (passing the refernce to the animated variable object) to update 
  //We also specify the animation settings

  useEffect(() => {
    Animated.timing(slideAnimY, {
        toValue: props.positions.endY,
        duration: 5000,
        useNativeDriver: true,
    }).start();
  }, [slideAnimY])
  //Same process as above but for the y position

  useEffect(() => {
    if(props.prompt)
    {
        props.positions.endX = ogEndX;
        props.positions.endY = ogEndY;
    }
    else{
        props.positions.endX = props.positions.startX;
        props.positions.endY = props.positions.startY;
    }
    //If the prompt becomes true (button switched on) update the target position to the slide-in position
    //If not, the button is off, so update the target end position to be the original (off screen) position

    Animated.timing(slideAnimX, {
        toValue: props.positions.endX,
        duration: 1000,
        useNativeDriver: true,
      }).start()
      Animated.timing(slideAnimY, {
        toValue: props.positions.endY,
        duration: 1000,
        useNativeDriver: true,
    }).start();
    //Kick off the first step of the animation towards the new target, thus updating slideAnimX and slideAnimY
    //This will cause the useEffects above to call and these will recursively call as these update the slideAnim variables
    //Which then trigger themselves again etc... Until they no longer change => reached their end position.

    //console.log(props.positions.endX);
  }, [props.prompt])
  //Is called when the prompt variable changes (a bool attatched to the button, essentiall on/off)

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [{translateX: slideAnimX}, {translateY: slideAnimY}]
    }}>
      {props.children}
    </Animated.View>
  );
  //We then return a special animated view with the original style but translated using slideAnimX and sldieAnimY
  //We return the animated view with all the same child structure as before -> Hence really just animating the "frame" of
  //the element "SlideInView" -> all children of this will be dragged along with this animating "frame"/which in react native
  //is called a view.
};

type ChangingTextProps = PropsWithChildren<{startText:string, endText:string, prompt: boolean, action:Function}>;

export const ChangingTextButton: React.FC<ChangingTextProps> = props => { 
  const [curText, setText] = useState(props.startText);
  useEffect(()=>
    {
      if(props.prompt == false)
        {
          setText(props.startText);
        }else{
          setText(props.endText);
        }
    }
  ), [props.prompt]
  return(
    <Button title = {curText} onPress={() => props.action}></Button>
  );
}