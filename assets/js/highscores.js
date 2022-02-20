let arr = JSON.parse(localStorage.getItem('highscores'))
 arr = arr.slice(-3); // 👉️ ['c', 'd', 'e']
console.log(arr[0].initials)


 for (let i = 0; i < 4; i++) {
    document.getElementById("i"+i).innerHTML = arr[i].initials
    document.getElementById("s"+i).innerHTML = arr[i].score
     
 }

