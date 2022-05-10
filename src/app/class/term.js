export default class Term {

    /**
     * @constructs Term
     * @param name {string} term
     * @param binary {number} if exists or not in the docId
     * @param occurrences {number} how many times occurred in every doc
     * @param docId {number} document id
     * @param tf {number}
     * @param idf {number}
     * @param tfidf {number}
     * @param metric {?number}
     */
    constructor(name, binary, occurrences, docId, tf = 0, idf = 0, tfidf = 0, metric = null) {
        /** @private **/
        this.name = name;
        /** @private **/
        this.binary = binary;
        /** @private **/
        this.occurrences = occurrences;
        /** @private **/
        this.docId = docId;
        /** @private **/
        this.tf = tf;
        /** @private **/
        this.idf = idf;
        /** @private **/
        this.tfidf = tfidf;
        /** @private **/
        this.metric = metric;
    }

    /**
     * @memberOf Term
     * @method
     */
    toString = () => {
        return this.name;
    }


    /**
     * @memberOf Term
     * @method
     * @param value {number}
     */
    setIdf = (value) => {
        this.idf = value;
    }

    /**
     * @memberOf Term
     * @method
     * @param value {number}
     */
    setTfIdf = (value) => {
        this.tfidf = value;
    }

    /**
     * @memberOf Term
     * @method
     * @param value {number}
     */
    setMetric = (value) => {
        this.metric = value;
    }

    /**
     * @memberOf Term
     * @method
     * @param value {number}
     */
    setBinary = (value) => {
        this.binary = value;
    }

    /**
     * @memberOf Term
     * @method
     * @param value {number}
     */
    setOccurrences = (value) => {
        this.occurrences = value;
    }

    /**
     * @memberOf Term
     * @method
     * @param value {number}
     */
    setTf = (value) => {
        this.tf = value;
    }
}