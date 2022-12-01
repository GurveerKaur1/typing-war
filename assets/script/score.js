class Score {

    #date;

    #count;

    #percentage;



    constructor(date,count,percentage){

        this.#date = date;

        this.#count = count;

        this.#percentage = percentage;

    }
    

    getDate(){
        return this.#date;
    }
   
   getDate() {
    return this.#count
   }
    

    getPercentage(){

        return this.#percentage;

    }

    getInfo(){

        return `Your score is ${this.#count} out of 90  </br></br>  You got </br> ${this.#percentage} % </br></br> ${this.#date}`

    }

}

export { Score };