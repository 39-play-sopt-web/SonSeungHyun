function solution(num_list) {
    var answer = 0;
    var odd_list = [];
    var even_list=[];
    
    for(let i = 0; i < num_list.length; i++) {
        if(num_list[i] % 2 != 0) {
            odd_list.push(num_list[i]);
        }
        else {
            even_list.push(num_list[i]);
        }
    }
    
    answer = parseInt(odd_list.join('')) + parseInt(even_list.join(''));
    
    return answer;
}