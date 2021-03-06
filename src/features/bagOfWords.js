/**
 * @module BagOfWords
 */

import {tf, idf, numberOfOccurrences, tfidf} from '../preprocessing/counting.js';
import Term from '../app/class/term.js'

/**
 * For each document processed adds the new unigrams to a list
 * @method
 * @param {Term[]} arrTerms1 Bag of words
 * @param {n} arrTerms2 document processed
 * @param {number} docId document id
 * @returns {Term[]} list of terms
 */
export const addUniqueTerms = (arrTerms1, arrTerms2, docId= 0) => {
    arrTerms2.forEach(word => {
        if (!arrTerms1.find(term => term.name === word))
            arrTerms1.push(new Term(word, 0, 0, docId));
    })
    return arrTerms1.sort((itemA, itemB) => itemA.name > itemB.name ? 1 : -1);
}

/**
 * Sets binary to 1 if the terms exists in termsArr
 * @method
 * @param bagOfWordsArr {Term[]}
 * @param termsArr {string[]}
 * @returns {Term[]}
 */
export const binaryVector = (bagOfWordsArr, termsArr) => {
    termsArr.map((word) => {
        bagOfWordsArr.forEach(term => {
            if (term.name === word)
                term.setBinary(1);
        });
    });

    return bagOfWordsArr;
}

/**
 * Sets the numberOf occurrences in every term
 * @method
 * @param bagOfWordsArr {Term[]}
 * @param termsArr {string[]}
 * @returns {Term[]}
 */
export const numberOfOccurrencesVector = (bagOfWordsArr, termsArr) => {
    bagOfWordsArr.forEach(term => {
        term.setOccurrences(numberOfOccurrences(term.name, termsArr.join(' ')));
    });
    return bagOfWordsArr;
}

/**
 * @method
 * @param bagOfWordsArr {Term[]}
 * @param termsArr {string[]}
 * @returns {Term[]}
 */
export const tfVector = (bagOfWordsArr, termsArr) => {
    try{
        bagOfWordsArr.forEach(term => {
            term.setTf(tf(term.name, termsArr.join(' ')))
        })
    }
    catch(err) {
        /* 
        console.log(bagOfWordsArr);
        console.log('--------')
        console.log(termsArr);
        */
    }
    return bagOfWordsArr;
}

/**
 * @method
 * @param bagOfWords {Term[]}
 * @param nDocs {number}
 * @param termsArr {string[]}
 * @returns {Term[]}
 */
export const idfVector = (bagOfWords, nDocs, termsArr) => {
    
    bagOfWords.forEach(term => {
        term.setIdf(idf(nDocs,term.occurrences))
    });
    return bagOfWords;
}

/**
 * @method
 * @param bagOfWordsArr {Term[]}
 * @param termsArr {string[]}
 * @returns {Term[]}
 */
export const tfidfVector = (bagOfWordsArr, termsArr) => {
    bagOfWordsArr.map((term, i) => {
        let tf = term.tf;
        let idf = term.idf;
        term.setTfIdf(tfidf(tf, idf));
    });

    return bagOfWordsArr;
}

/**
 * 
 * @param {*} termsArr {Term[]} all with the same name
 */
export const sumVector = (termsArr) => {
    const term = new Term(termsArr[0].name, 0, 0, termsArr[0].docId)

    const docsWithTerm = terms.filter((term) => term.binaryVector).length;
    const nDocs = terms.length;
    const idfTerm = idf(nDocs, docsWithTerm);

    for (let index in termsArr) {
        term.setOccurrences(term.occurrences + termsArr[index].occurrences)
        term.setTf(termsArr[index].tf)
        term.setBinary(termsArr[index].binary)
        term.setTfIdf(tfidf(termsArr[index].tf, idfTerm))
    }

    return term;
}

/**
 * @method
 * @param binaryVector {number[]}
 * @returns {number}
 */
export const sumBinary = (binaryVector) => {
    return binaryVector.reduce(function (prev, actual) {
        return (prev === actual && prev === 1) ? prev : 0;
    })
}

export const avgVector = (termsArr) => {
    const term = sumVector(termsArr);

    term.setOccurrences(term.occurrences / termsArr.length)
    term.setTf(term.tf / termsArr.length)
    term.setBinary(term.binary / termsArr.length)
    // tfidf?
}