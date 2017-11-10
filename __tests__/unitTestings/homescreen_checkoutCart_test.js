import React from 'react';
import 'react-native';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
configure({ adapter: new Adapter() });import renderer from 'react-test-renderer';
global.React = React;
global.renderer = renderer;
global.shallow = shallow;

const _ = require('lodash');

// props
const globalState = {
  cart: {
    1: 0,
    2: 0,
  },
  items: [
    {
      key: 1,
      title: 'Cups',
      imageUrl: require('./img/cupstxt1.png'),
      defaultQuantity: 10,
      pricePerDefaultQuantity: 2.99,
    },
    {
      key: 2,
      title: 'Balls',
      imageUrl: require('./img/ballstxt1.png'),
      defaultQuantity: 2,
      pricePerDefaultQuantity: 2.99,
    },
  ]
}

const onPress = (item, state) => {
  var count = state.cart[item.key];
  state.cart[item.key] = count+1;
};

describe('add to cart testing', () => {
  const inputItem ={
      key: 1,
      title: 'Cups',
      imageUrl: require('./img/cupstxt1.png'),
      defaultQuantity: 10,
      pricePerDefaultQuantity: 2.99,
    };
  it('should increment item', () => {
    var count = globalState.cart[inputItem.key];
    onPress(inputItem, globalState);
    expect(globalState.cart[inputItem.key]).toEqual(count+1);
  });
});

describe('activate checoutCart button', () => {
  const inputItem ={
      key: 1,
      title: 'Cups',
      imageUrl: require('./img/cupstxt1.png'),
      defaultQuantity: 10,
      pricePerDefaultQuantity: 2.99,
    };

  it('should make disabled false', () => {  
    onPress(inputItem, globalState);

    var inCart = globalState.cart,
        total = 0,
        i;

    for (i = 1; i <= Object.keys(inCart).length; i++) {  //loop through the array
      total += inCart[i];  //Do the math!
      console.log(inCart[i]);
    }

    var disabled=(total == 0)
    // the button should not be disabled after pressing the item once
    expect(disabled).toEqual(false);
  });
});

// describe('ReactNativeTestingUtils', () => {
//   describe('capitalizeWord', () => {
//     const words = [
//       'car',
//       'dogsAREbest',
//       'lOreal'
//     ];
//     const expectedWords = [
//       'Car',
//       'Dogsarebest',
//       'Loreal'
//     ];
//     it('should capitalize word', () => {
//       words.forEach((word, index) => {
//         expect(capitalizeWord(word)).toEqual(expectedWords[index]);
//       });
//     });
//   });

//   describe('capitalizeWords', () => {
//     const sentences = [
//       'a dOg was   running',
//       'fLyers will win STANLEY CUP',
//       'my AVOCAdo dieD'
//     ];
//     const expectedSentences = [
//       'A Dog Was   Running',
//       'Flyers Will Win Stanley Cup',
//       'My Avocado Died'
//     ];
//     it('should capitalize each word in a sentence', () => {
//       sentences.forEach((sentence, index) => {
//         expect(capitalizeWords(sentence)).toEqual(expectedSentences[index]);
//       });
//     });
//   });
// });









// // __tests__/CheckboxWithLabel-test.js

// import React from 'react';
// import HomeScreen from '../src/HomeScreen';
// import Adapter from 'enzyme-adapter-react-15';
// // import { configure } from 'enzyme';
// import { configure, shallow, mount, render } from 'enzyme';

// configure({ adapter: new Adapter() });
// it('HomeScreen checkout cart', () => {
// 	// this.state = {
//  //      cart: {
//  //        1: 0,
//  //        2: 0,
//  //      },
//  //      items: [
//  //        {
//  //          key: 1,
//  //          title: 'Cups',
//  //          imageUrl: require('./img/cupstxt1.png'),
//  //          defaultQuantity: 10,
//  //          pricePerDefaultQuantity: 2.99,
//  //        },
//  //        {
//  //          key: 2,
//  //          title: 'Balls',
//  //          imageUrl: require('./img/ballstxt1.png'),
//  //          defaultQuantity: 2,
//  //          pricePerDefaultQuantity: 2.99,
//  //        },
//  //      ]
//  //    }
//     const datas = [
//         {
//           key: 1,
//           title: 'Cups',
//           imageUrl: require('./img/cupstxt1.png'),
//           defaultQuantity: 10,
//           pricePerDefaultQuantity: 2.99,
//         },
//         {
//           key: 2,
//           title: 'Balls',
//           imageUrl: require('./img/ballstxt1.png'),
//           defaultQuantity: 2,
//           pricePerDefaultQuantity: 2.99,
//         },
//       ]
// 	const HomeScreen = shallow(<HomeScreen data={datas} />); 
// 	    expect(HomeScreen.find('.icon-star')).to.have.length(1);

//    // expect(tree).toMatchSnapshot();
// });
// // test('HomeScreen checkout cart', () => {
// //   // Render a checkbox with label in the document

// //   const HomeScreen = shallow(
// //     <HomeScreen />
// //   );

// //   // HomeScreen.find('Button').simulate('press');

// //   // expect(HomeScreen.text()).toEqual('On');
// // });