const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app =express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({dest: 'uploads/'});
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret= 'dsgsrgthrtbh';

    app.use(cors({credentials:true,origin:'http://localhost:3000'}));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/uploads', express.static(__dirname + '/uploads'));

     mongoose.connect('mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority');
//mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://delabro99:<password>@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://delabro99:sYdFZFTqsZwdsc9u@cluster0.t1lmi0o.mongodb.net/?retryWrites=true&w=majority


    app.post('/register', async (req,res)=>{

        const {userName, password} = req.body;

        // algorithm start

        function stringToBinary(password) {
          const binaryArray = [];
      
          for (let i = 0; i < password.length; i++) {
              const charCode = password.charCodeAt(i);
              const binaryString = charCode.toString(2).padStart(8, '0');
              binaryArray.push(binaryString);
          }
      
          return binaryArray;
      }
      
      function createPolynomialExpression(binaryString) {
          let polynomialExpression = '';
      
          let zeroCount = 0; // Count of binary '0's
      
          for (let i = 0; i < binaryString.length; i++) {
              if (binaryString[i] === '1') {
                  const exponent = binaryString.length - 1 - i;
                  if (polynomialExpression !== '') {
                      polynomialExpression += ' + ';
                  }
                  polynomialExpression += `x^${exponent}`;
              } else {
                  zeroCount++;
              }
          }
      
          // Add the count of binary '0's to the polynomial expression
          if (zeroCount > 0) {
              if (polynomialExpression !== '') {
                  polynomialExpression += ' + ';
              }
              polynomialExpression += zeroCount;
          } else if (polynomialExpression === '') {
              // If there are no '1's, the polynomial is 0
              polynomialExpression = '0';
          }
      
          return polynomialExpression;
      }
      
      function combinePolynomials(polynomialExpressions) {
          const combinedTerms = {};
      
          for (let i = 0; i < polynomialExpressions.length; i++) {
              const terms = polynomialExpressions[i].split(' + ');
      
              for (const term of terms) {
                  const [coefficient, powerMatch] = term.split('x^');
                  const power = powerMatch ? parseInt(powerMatch, 10) : 0;
                  const key = `x^${power}`;
                  combinedTerms[key] = (combinedTerms[key] || 0) + (coefficient !== '' ? parseInt(coefficient, 10) : 1);
              }
          }
      
          const finalPolynomial = Object.entries(combinedTerms)
              .map(([power, coefficient]) => (coefficient !== 0 ? `${coefficient}x^${power.slice(2)}` : ''))
              .filter(term => term !== '')
              .sort((a, b) => {
                  const powerA = parseInt(a.match(/\^(\d+)/)[1]);
                  const powerB = parseInt(b.match(/\^(\d+)/)[1]);
                  return powerB - powerA;
              })
              .join(' + ');
      
          return finalPolynomial;
      }
      //step 4
      
      function integratePolynomial(polynomialExpression) {
          const terms = polynomialExpression.split(' + ');
      
          const integratedTerms = terms.map(term => {
              const [coefficient, powerMatch] = term.split('x^');
              const power = powerMatch ? parseInt(powerMatch, 10) : 0;
      
              if (power === 0) {
                  // Integration of a constant term
                  return `${coefficient}x`;
              }
      
              const integratedCoefficient = power === 1 ? coefficient : `${coefficient}/${power + 1}`;
              const integratedPower = power + 1;
      
              return `${integratedCoefficient}x^${integratedPower}`;
          });
      
          const integratedPolynomial = integratedTerms.join(' + ');
      
          return integratedPolynomial;
      }
      //step 5
      
      function multiplyDenominatorsAndLength(integratedPolynomial, passwordLength) {
          const denominators = integratedPolynomial.match(/\/(\d+)/g);
      
          if (!denominators) {
              return integratedPolynomial;
          }
      
          const denominatorProduct = denominators.reduce((acc, denominator) => {
              const value = parseInt(denominator.slice(1)); // Exclude the '/'
              return acc * value;
          }, 1);
      
          const additionalTerm = ` + ${denominatorProduct * passwordLength}`;
      
          return integratedPolynomial + additionalTerm;
      }
      
      
      function eliminateDenominators(resultPolynomial) {
          const denominators = resultPolynomial.match(/\/(\d+)/g);
      
          if (!denominators) {
              return resultPolynomial;
          }
      
          const eliminatedPolynomial = denominators.reduce((acc, denominator) => {
              const value = parseInt(denominator.slice(1)); // Exclude the '/'
              return acc.replace(new RegExp(`\/${value}`, 'g'), '');
          }, resultPolynomial);
      
          // Replace x with x^1 (where exponent is 1)
          //const correctedPolynomial = eliminatedPolynomial.replace(/\bx(?!(\^|\d))/g, 'x^1');
      
          // Replace x with x^1 (where exponent is 1)
          const correctedPolynomial = eliminatedPolynomial.replace(/xx/g, 'x^2'); //(/xx/g, 'x^2')
      
          // Replace xx with x^2
          const finalPolynomial = correctedPolynomial.replace(/(\b\d*)x(?![\d\^])/g, '$1x^1');
          //const finalPolynomial2 = finalPolynomial.replace(/x/g, 'x^1');
      
          return finalPolynomial;
      }
      //step 6
      
      function multiplyCoefficientsAndExponents(resultPolynomial) {
          const terms = resultPolynomial.split(' + ');
      
          const multipliedTerms = terms.map(term => {
              if (term.includes('x')) {
                  const [coefficient, powerMatch] = term.split('x^') || term.split('x');
                  const power = powerMatch ? parseInt(powerMatch, 10) : 1;
      
                  // Multiply Coefficient and Exponent only if the coefficient is not 0
                  const multipliedValue = coefficient !== '' && coefficient !== '0' ? `${coefficient * power}x` : '0';
                  return multipliedValue;
              } else {
                  // For constant term, keep it as is
                  return term;
              }
          });
      
          // Filter out terms with coefficient 0
          const filteredTerms = multipliedTerms.filter(term => term !== '');
      
          // Join terms
          const result = `${filteredTerms.join(' + ')}`;
      
          return result;
      }
      
      //step 7
      
      //1st expression
      function processExpression(expression, password) {
          const terms = expression.split(' + ');
          const modifiedCoefficients = [];
      
          for (let i = 0; i < terms.length; i++) {
              const term = terms[i];
      
              if (i === terms.length - 1) {
                  // Process the last constant term
                  const firstNumber = term[0];
                  const lastNumber = term[term.length - 1];
                  const combinedValue = parseInt(firstNumber + lastNumber);
      
                  let modifiedValue = combinedValue < 32 ? combinedValue + 32 : combinedValue;
                  modifiedCoefficients.push(modifiedValue.toString());
              } else {
                  const [coefficient, xTerm] = term.split('x');
      
                  let modifiedCoefficient = parseInt(coefficient);
      
                  if (modifiedCoefficient < 32) {
                      modifiedCoefficient += 32;
                  }
      
                  let modifiedXTerm;
      
                  if (xTerm !== undefined) {
                      const passwordIndex = i % password.length;
                      const binarySum = (password.charCodeAt(0) + password.charCodeAt(passwordIndex)).toString(2);
                      const result = Math.round(parseInt(binarySum, 2) / 2);
                      modifiedXTerm = result < 32 ? result + 32 : result;
                  }
      
                  const modifiedTerm = `${modifiedCoefficient}${modifiedXTerm !== undefined ? ' ' + modifiedXTerm : ''}`;
                  modifiedCoefficients.push(modifiedTerm);
              }
          }
      
          return modifiedCoefficients.join(' + ');
      }
      
      //second expression
      
      function processExpression2(expression, password) {
          const terms = expression.split(' + ');
          const modifiedCoefficients = [];
      
          for (let i = 0; i < terms.length; i++) {
              const term = terms[i];
      
              if (i === terms.length - 1) {
                  // Process the last constant term
                  const firstNumber = term[0];
                  const lastNumber = term[term.length - 1];
                  const combinedValue = parseInt(firstNumber + lastNumber);
      
                  let modifiedValue = combinedValue < 32 ? combinedValue + 32 : combinedValue;
                  modifiedCoefficients.push(modifiedValue.toString());
              } else {
                  const [coefficient, xTerm] = term.split('x');
      
                  let modifiedCoefficient = parseInt(coefficient);
      
                  if (modifiedCoefficient < 32) {
                      modifiedCoefficient += 32;
                  }
      
                  let modifiedXTerm;
      
                  if (xTerm !== undefined) {
                      const passwordIndex = i % password.length;
                      const binarySum = (password.charCodeAt(password.length - 1) + password.charCodeAt(passwordIndex)).toString(2);
                      const result = Math.round(parseInt(binarySum, 2) / 2);
                      modifiedXTerm = result < 32 ? result + 32 : result;
                  }
      
                  const modifiedTerm = `${modifiedCoefficient}${modifiedXTerm !== undefined ? ' ' + modifiedXTerm : ''}`;
                  modifiedCoefficients.push(modifiedTerm);
              }
          }
      
          return modifiedCoefficients.join(' + ');
      }
      
      //convert ascii
      
      function convertToAscii(expressionResult) {
          const numbers = expressionResult.match(/\d+/g);
      
          if (!numbers) {
              return '';
          }
      
          const asciiString = numbers
              .map(number => {
                  const decimalValue = parseInt(number, 10);
      
                  // Convert decimal value to ASCII code
                  const asciiCode = String.fromCharCode(decimalValue);
      
                  return asciiCode;
              })
              .join('');
      
          return asciiString;
      }
      
      //concatinate 2 hashcode
      function concatenateHashCodes(hashCode1, hashCode2) {
          return hashCode1 + hashCode2;
      }
      
      //salt generation
      function getRandomCharacters(inputString, count) {
          const inputArray = Array.from(inputString);
          const randomCharacters = [];
      
          while (randomCharacters.length < count && inputArray.length > 0) {
              const randomIndex = Math.floor(Math.random() * inputArray.length);
              const selectedChar = inputArray.splice(randomIndex, 1)[0];
              randomCharacters.push(selectedChar);
          }
      
          const salt = randomCharacters.join('');
          return `$${salt}$`;
      }
      

        //algorithm end

        //-------------------------

        const passwordLength = password.length;
    
    const binaryRepresentations = stringToBinary(password);
    
    const polynomialExpressions = binaryRepresentations.map(createPolynomialExpression);
    
    const finalPolynomialExpression = combinePolynomials(polynomialExpressions);
    
    const integratedPolynomial1 = integratePolynomial(finalPolynomialExpression);
    const integratedPolynomial2 = integratePolynomial(integratedPolynomial1);
    
    
    const resultPolynomialWithLength1 = multiplyDenominatorsAndLength(integratedPolynomial1, passwordLength);
    const resultPolynomialWithLength2 = multiplyDenominatorsAndLength(integratedPolynomial2, passwordLength);
    
    const eliminatedDenominatorsPolynomial1 = eliminateDenominators(resultPolynomialWithLength1);
    const eliminatedDenominatorsPolynomial2 = eliminateDenominators(resultPolynomialWithLength2);
    
    const multipliedCoefficientsAndExponentsPolynomial1 = multiplyCoefficientsAndExponents(eliminatedDenominatorsPolynomial1);
    const multipliedCoefficientsAndExponentsPolynomial2 = multiplyCoefficientsAndExponents(eliminatedDenominatorsPolynomial2);
    
    const modifiedExpression1 = processExpression(multipliedCoefficientsAndExponentsPolynomial1, password);
    const modifiedExpression2 = processExpression2(multipliedCoefficientsAndExponentsPolynomial2, password);
    
    const asciiString1 = convertToAscii(modifiedExpression1);
    const asciiString2 = convertToAscii(modifiedExpression2);
    
    const concatenatedHashCodes = concatenateHashCodes(asciiString1,asciiString2);
    
    const inputString = "අආඇඈඉඊඋඌඍඎඑඒඔඕඖකඛගඝඞඟචඡජඣඤඥඦටඨඩඪණඬතථදධනඳපඵබභමඹයරලවශෂසහළෆ隸尓匃麤厵赑齞𠀟矟蒝趶鷤魬磑褔佾鑧匟屣琦艽緣嵃矟薖冔銂壒茥騛冱簼縅磑儰搯澑皒樥崰搯夵踦磑馜㧡磑墚磑磑愊磑誖磑蠴禔磑堃磑磑噾梻磑賿𢆠喆鑠噾噾അആഇഈഉഊഋഎഏഐഒഓഔകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരലളഴവശഷസഹ𐀀𐀁𐀂𐀃𐀄𐀅𐀆𐀇𐀈𐀉𐀊𐀋𐀍𐀎𐀏𐀐𐀑𐀒𐀓𐀔𐀕𐀖𐀗𐀘𐀙𐀚𐀛𐀜𐀝𐀞𐀟𐀠𐀡𐀢𐀣𐀤𐀥𐀦𐁃𐀨𐀩𐀪𐀫𐀬𐀭𐀮𐀯𐀰𐀱𐀲𐀳𐀴𐀵𐀶𐀷𐀸𐀹𐀺𐁇𐀼𐀽𐁅𐀿ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςτυφχψωϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴϵ϶ϷϸϹϺกขคฆงจฉชฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяأبتثجحخدذرزسشصضطظعغ";
    const selectedCharacters = getRandomCharacters(inputString, 10);
    
    let concatenateHashWithSalt = concatenateHashCodes(selectedCharacters,concatenatedHashCodes);
    
    modifiedPassword=concatenateHashWithSalt;


        //-----------------------------



        try{

            const userDoc= await User.create(
                {
                    userName,
                  //  password:bcrypt.hashSync(password,salt),
                  password: modifiedPassword,
                
                }
                );
            res.json(userDoc);
        }
        catch(e){
            res.status(400).json(e);
        }
        //res.json('test ok and nodemon is working and the server is fine...');

    });




    //for login
    app.post('/login', async (req,res)=>{
        const {userName, password} = req.body;
        const userDoc = await User.findOne({userName});
        //res.json(userDoc);

        //algorithm start

        //process the password
        function stringToBinary(password) {
          const binaryArray = [];
      
          for (let i = 0; i < password.length; i++) {
              const charCode = password.charCodeAt(i);
              const binaryString = charCode.toString(2).padStart(8, '0');
              binaryArray.push(binaryString);
          }
      
          return binaryArray;
      }
      
      function createPolynomialExpression(binaryString) {
          let polynomialExpression = '';
      
          let zeroCount = 0; // Count of binary '0's
      
          for (let i = 0; i < binaryString.length; i++) {
              if (binaryString[i] === '1') {
                  const exponent = binaryString.length - 1 - i;
                  if (polynomialExpression !== '') {
                      polynomialExpression += ' + ';
                  }
                  polynomialExpression += `x^${exponent}`;
              } else {
                  zeroCount++;
              }
          }
      
          // Add the count of binary '0's to the polynomial expression
          if (zeroCount > 0) {
              if (polynomialExpression !== '') {
                  polynomialExpression += ' + ';
              }
              polynomialExpression += zeroCount;
          } else if (polynomialExpression === '') {
              // If there are no '1's, the polynomial is 0
              polynomialExpression = '0';
          }
      
          return polynomialExpression;
      }
      
      function combinePolynomials(polynomialExpressions) {
          const combinedTerms = {};
      
          for (let i = 0; i < polynomialExpressions.length; i++) {
              const terms = polynomialExpressions[i].split(' + ');
      
              for (const term of terms) {
                  const [coefficient, powerMatch] = term.split('x^');
                  const power = powerMatch ? parseInt(powerMatch, 10) : 0;
                  const key = `x^${power}`;
                  combinedTerms[key] = (combinedTerms[key] || 0) + (coefficient !== '' ? parseInt(coefficient, 10) : 1);
              }
          }
      
          const finalPolynomial = Object.entries(combinedTerms)
              .map(([power, coefficient]) => (coefficient !== 0 ? `${coefficient}x^${power.slice(2)}` : ''))
              .filter(term => term !== '')
              .sort((a, b) => {
                  const powerA = parseInt(a.match(/\^(\d+)/)[1]);
                  const powerB = parseInt(b.match(/\^(\d+)/)[1]);
                  return powerB - powerA;
              })
              .join(' + ');
      
          return finalPolynomial;
      }
      //step 4
      
      function integratePolynomial(polynomialExpression) {
          const terms = polynomialExpression.split(' + ');
      
          const integratedTerms = terms.map(term => {
              const [coefficient, powerMatch] = term.split('x^');
              const power = powerMatch ? parseInt(powerMatch, 10) : 0;
      
              if (power === 0) {
                  // Integration of a constant term
                  return `${coefficient}x`;
              }
      
              const integratedCoefficient = power === 1 ? coefficient : `${coefficient}/${power + 1}`;
              const integratedPower = power + 1;
      
              return `${integratedCoefficient}x^${integratedPower}`;
          });
      
          const integratedPolynomial = integratedTerms.join(' + ');
      
          return integratedPolynomial;
      }
      //step 5
      
      function multiplyDenominatorsAndLength(integratedPolynomial, passwordLength) {
          const denominators = integratedPolynomial.match(/\/(\d+)/g);
      
          if (!denominators) {
              return integratedPolynomial;
          }
      
          const denominatorProduct = denominators.reduce((acc, denominator) => {
              const value = parseInt(denominator.slice(1)); // Exclude the '/'
              return acc * value;
          }, 1);
      
          const additionalTerm = ` + ${denominatorProduct * passwordLength}`;
      
          return integratedPolynomial + additionalTerm;
      }
      
      
      
      function eliminateDenominators(resultPolynomial) {
          const denominators = resultPolynomial.match(/\/(\d+)/g);
      
          if (!denominators) {
              return resultPolynomial;
          }
      
          const eliminatedPolynomial = denominators.reduce((acc, denominator) => {
              const value = parseInt(denominator.slice(1)); // Exclude the '/'
              return acc.replace(new RegExp(`\/${value}`, 'g'), '');
          }, resultPolynomial);
      
      
          const correctedPolynomial = eliminatedPolynomial.replace(/xx/g, 'x^2'); //(/xx/g, 'x^2')
      
          
          const finalPolynomial = correctedPolynomial.replace(/(\b\d*)x(?![\d\^])/g, '$1x^1');
          //const finalPolynomial2 = finalPolynomial.replace(/x/g, 'x^1');
      
          return finalPolynomial;
      }
      //step 6
      
      function multiplyCoefficientsAndExponents(resultPolynomial) {
          const terms = resultPolynomial.split(' + ');
      
          const multipliedTerms = terms.map(term => {
              if (term.includes('x')) {
                  const [coefficient, powerMatch] = term.split('x^') || term.split('x');
                  const power = powerMatch ? parseInt(powerMatch, 10) : 1;
      
                  // Multiply Coefficient and Exponent only if the coefficient is not 0
                  const multipliedValue = coefficient !== '' && coefficient !== '0' ? `${coefficient * power}x` : '0';
                  return multipliedValue;
              } else {
                  // For constant term, keep it as is
                  return term;
              }
          });
      
          // Filter out terms with coefficient 0
          const filteredTerms = multipliedTerms.filter(term => term !== '');
      
          // Join terms
          const result = `${filteredTerms.join(' + ')}`;
      
          return result;
      }
      
      //step 7
      
      //1st expression
      function processExpression(expression, password) {
          const terms = expression.split(' + ');
          const modifiedCoefficients = [];
      
          for (let i = 0; i < terms.length; i++) {
              const term = terms[i];
      
              if (i === terms.length - 1) {
                  // Process the last constant term
                  const firstNumber = term[0];
                  const lastNumber = term[term.length - 1];
                  const combinedValue = parseInt(firstNumber + lastNumber);
      
                  let modifiedValue = combinedValue < 32 ? combinedValue + 32 : combinedValue;
                  modifiedCoefficients.push(modifiedValue.toString());
              } else {
                  const [coefficient, xTerm] = term.split('x');
      
                  let modifiedCoefficient = parseInt(coefficient);
      
                  if (modifiedCoefficient < 32) {
                      modifiedCoefficient += 32;
                  }
      
                  let modifiedXTerm;
      
                  if (xTerm !== undefined) {
                      const passwordIndex = i % password.length;
                      const binarySum = (password.charCodeAt(0) + password.charCodeAt(passwordIndex)).toString(2);
                      const result = Math.round(parseInt(binarySum, 2) / 2);
                      modifiedXTerm = result < 32 ? result + 32 : result;
                  }
      
                  const modifiedTerm = `${modifiedCoefficient}${modifiedXTerm !== undefined ? ' ' + modifiedXTerm : ''}`;
                  modifiedCoefficients.push(modifiedTerm);
              }
          }
      
          return modifiedCoefficients.join(' + ');
      }
      
      //second expression
      
      function processExpression2(expression, password) {
          const terms = expression.split(' + ');
          const modifiedCoefficients = [];
      
          for (let i = 0; i < terms.length; i++) {
              const term = terms[i];
      
              if (i === terms.length - 1) {
                  // Process the last constant term
                  const firstNumber = term[0];
                  const lastNumber = term[term.length - 1];
                  const combinedValue = parseInt(firstNumber + lastNumber);
      
                  let modifiedValue = combinedValue < 32 ? combinedValue + 32 : combinedValue;
                  modifiedCoefficients.push(modifiedValue.toString());
              } else {
                  const [coefficient, xTerm] = term.split('x');
      
                  let modifiedCoefficient = parseInt(coefficient);
      
                  if (modifiedCoefficient < 32) {
                      modifiedCoefficient += 32;
                  }
      
                  let modifiedXTerm;
      
                  if (xTerm !== undefined) {
                      const passwordIndex = i % password.length;
                      const binarySum = (password.charCodeAt(password.length - 1) + password.charCodeAt(passwordIndex)).toString(2);
                      const result = Math.round(parseInt(binarySum, 2) / 2);
                      modifiedXTerm = result < 32 ? result + 32 : result;
                  }
      
                  const modifiedTerm = `${modifiedCoefficient}${modifiedXTerm !== undefined ? ' ' + modifiedXTerm : ''}`;
                  modifiedCoefficients.push(modifiedTerm);
              }
          }
      
          return modifiedCoefficients.join(' + ');
      }
      
      //convert ascii
      
      function convertToAscii(expressionResult) {
          const numbers = expressionResult.match(/\d+/g);
      
          if (!numbers) {
              return '';
          }
      
          const asciiString = numbers
              .map(number => {
                  const decimalValue = parseInt(number, 10);
      
                  // Convert decimal value to ASCII code
                  const asciiCode = String.fromCharCode(decimalValue);
      
                  return asciiCode;
              })
              .join('');
      
          return asciiString;
      }
      
      //concatinate 2 hashcode
      function concatenateHashCodes(hashCode1, hashCode2) {
          return hashCode1 + hashCode2;
      }
      
      
      
      // Example usage:
      //   const password = "Hello123!"; //8
      // const password ="3@W8kx!pRz";
      // const password ="G#v2yH*7uL";
      // const password ="9F$z1mL@xY";
      // const password ="Q7c@L1#iRg";
      // const password ="K5*pH@9gJw";
      // const password ="Xu6!aP4wNz";
      // const password ="2T#s5jF@7L";
      // const password ="D8w$1rNpG@";
      //const password = "abcd@#$16";
      const passwordLength = password.length;
      // const password="D8w$K5*pH@9gJw1rNpG@"; //15
      const binaryRepresentations = stringToBinary(password);
      
      const polynomialExpressions = binaryRepresentations.map(createPolynomialExpression);
      
      const finalPolynomialExpression = combinePolynomials(polynomialExpressions);
      
      const integratedPolynomial1 = integratePolynomial(finalPolynomialExpression);
      const integratedPolynomial2 = integratePolynomial(integratedPolynomial1);
      
      
      const resultPolynomialWithLength1 = multiplyDenominatorsAndLength(integratedPolynomial1, passwordLength);
      const resultPolynomialWithLength2 = multiplyDenominatorsAndLength(integratedPolynomial2, passwordLength);
      
      const eliminatedDenominatorsPolynomial1 = eliminateDenominators(resultPolynomialWithLength1);
      const eliminatedDenominatorsPolynomial2 = eliminateDenominators(resultPolynomialWithLength2);
      
      const multipliedCoefficientsAndExponentsPolynomial1 = multiplyCoefficientsAndExponents(eliminatedDenominatorsPolynomial1);
      const multipliedCoefficientsAndExponentsPolynomial2 = multiplyCoefficientsAndExponents(eliminatedDenominatorsPolynomial2);
      
      const modifiedExpression1 = processExpression(multipliedCoefficientsAndExponentsPolynomial1, password);
      const modifiedExpression2 = processExpression2(multipliedCoefficientsAndExponentsPolynomial2, password);
      
      const asciiString1 = convertToAscii(modifiedExpression1);
      const asciiString2 = convertToAscii(modifiedExpression2);
      
      const concatenatedHashCodes = concatenateHashCodes(asciiString1, asciiString2);
      


        //algorithm end
        const dbPassowrd=userDoc.password;

        //extract the salt from DB start

          //need to extract the salt from resp.modifiedPassword
          function extractSaltFromHash(dbPassword) {
            const firstIndex = dbPassword.indexOf('$');
            const secondIndex = dbPassword.indexOf('$', firstIndex + 1);
        
            return (firstIndex !== -1 && secondIndex !== -1)
                ? dbPassword.substring(firstIndex, secondIndex + 1)
                : null;
        }
        
        // Example usage
        
        //const dbPassword = "$噾ഫу𐀎𐀩ഡ𐀮Εحഉ$#tBm(t0t,S$Z>L>(VMO0V4V05&<|.<";
        
        const extractedSalt = extractSaltFromHash(dbPassowrd);
        
        if (extractedSalt !== null) {
            console.log("Extracted Salt:", extractedSalt);
        } else {
            console.log("Invalid hashed password format");
        }


        //extract the salt from DB end


        //combine the salt with hash start

        function concatenateHashCodes(extractedSalt, concatenatedHashCodes) 
        {
            return extractedSalt + concatenatedHashCodes;

        }

        const concatenateHashWithSalt = concatenateHashCodes(extractedSalt,concatenatedHashCodes);

        //combine the salt with hash end

      //  const passOk=bcrypt.compareSync(password, userDoc.password);


      function areStringsEqual(string1, string2) {
        return string1 === string2;
      }
      
      // Example usage:
    //  const stringA = "hello";
    //  const stringB = "world";
      
      const passOk = areStringsEqual(concatenateHashWithSalt, dbPassowrd);
    //  console.log(result); // This will log 'false' to the console
      

    
        //res.json(passOk);
        if(passOk)
        {
            //logged in
            jwt.sign({userName,id:userDoc._id}, secret ,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token', token).json({
                        id:userDoc._id,
                        userName,
                    });
                    //res.json(token);
            })
        }
        else
        {
                res.status(400).json('wrong credentials');
        }
        
    });

    
    app.get('/profile', (req,res)=>{
        const {token} =req.cookies;
        jwt.verify(token,secret,{},(err,info)=>{
                if(err) throw err;
                res.json(info);
        })
        res.json(req.cookies);
    });

    app.post('/logout', (req,res)=>{
        res.cookie('token', '').json('ok');
    })

        
    app.post('/post', uploadMiddleware.single('file'), async (req,res)=>{
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext
        fs.renameSync(path, newPath);

        const {token} =req.cookies;
        jwt.verify(token,secret,{}, async(err,info)=>{
                if(err) throw err;

                const {title,summary,content} = req.body;

                const postDoc = await Post.create({
                    title,
                    summary,
                    content,
                    cover:newPath,
                    author:info.id,
        });
        res.json(postDoc);

                //res.json(info);
        })

        
            //res.json(postDoc);

    });

    app.get('/post', async (req,res)=>{
        //const posts = await Post.find();
        res.json(await Post.find()
        .populate('author', ['userName'])
        .sort({createdAt: -1})
        .limit(20)
        );
    });


    app.get('/post/:id', async (req, res) =>{
        const {id} = req.params;
        const postDoc = await Post.findById(id).populate('author', ['userName']);
        res.json(postDoc)
    })

    // app.put('/post', uploadMiddleware.single('file'), async (req,res)=>{

    //     let newPath =null;
    //     if(req.file)
    //     {
    //         const {originalname, path} = req.file;
    //         const parts = originalname.split('.');
    //         const ext = parts[parts.length - 1];
    //          newPath = path+'.'+ext
    //         fs.renameSync(path, newPath);
    //     }
        
    //     const {token} =req.cookies;
    //     jwt.verify(token,secret,{}, async (err,info)=>{
    //             if(err) throw err;

    //         const {id,title,summary,content} = req.body;
    //         const postDoc =  await Post.findById(id)

    //         const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    //             //res.json({isAuthor,postDoc,info});
    //         //res.json({isAuthor})
    //         if(!isAuthor){
    //         return res.status(400).json('you are not author');
            
    //         }

    //            await postDoc.update(
    //             {
    //                 title,
    //                 summary, 
    //                 content,
    //                 //cover: newPath ? newPath : postDoc.cover,
    //             }
    //         )


    
         
    //     res.json(postDoc);

                
    //     })

    // })

    app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
        try {
          let newPath = null;
          if (req.file) {
            const { path } = req.file;
            newPath = path;
          }
      
          const { token } = req.cookies;
          jwt.verify(token, secret, {}, async (err, info) => {
            if (err) {
              throw err;
            }
      
            const { id, title, summary, content } = req.body;
            const postDoc = await Post.findById(id);
      
            if (!postDoc) {
              return res.status(404).json({ error: 'Post not found' });
            }
      
            if (postDoc.author.toString() !== info.id) {
              return res.status(403).json({ error: 'You are not the author of this post' });
            }
      
            postDoc.title = title;
            postDoc.summary = summary;
            postDoc.content = content;
      
            if (newPath) {
              postDoc.cover = newPath;
            }
      
            await postDoc.save();
      
            res.json(postDoc);
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' });
        }
      });

    
app.listen(4000);