

class timerCount {
    constructor({selector, targetDate}) {
        this.timeId = null;
      
        this.days = document.querySelector(`${selector} [data-value="days"]`);
        this.hours = document.querySelector(`${selector} [data-value="hours"]`);
        this.mins = document.querySelector(`${selector} [data-value="mins"]`);
        this.secs = document.querySelector(`${selector} [data-value="secs"]`);
  
        this.targetDate = targetDate;
        this.timeLeft();     
            
    }
        
       
    pad(value) {
        return String(value).padStart(1)
    }
    
     getTimerComponents(time) {
         
    
        //  * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
        //  * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
        //  */
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

        /*
        * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
        * остатка % и делим его на количество миллисекунд в одном часе
        * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
        */
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

        /*
        * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
        * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
        */
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

        /*
        * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
        * миллисекунд в одной секунде (1000)
        */
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return {days, hours, mins, secs}
        
    }
    
   
    showData({days, hours, mins, secs}) {
        this.days.textContent = days;
        this.hours.textContent = hours;
        this.mins.textContent = mins;
        this.secs.textContent = secs;
    }
    
    timeLeft() {
        const date = document.querySelector(this.selector);
        console.log(date);

        const start = this.targetDate.getTime();
        //console.log(start);
        this.timeId = setInterval(() => {
            const curent = Date.now();
            const deltaTime = start - curent;
            const {days, hours, mins, secs} = this.getTimerComponents(deltaTime);
            // console.log(`${days}:${hours}:${mins}:${secs}`);
            this.showData({days, hours, mins, secs});
        }, 1000);
    }
    
}




const timer1 = new timerCount({
    selector: '#timer-1',
    targetDate: new Date('Oct 31, 2021'),
});
