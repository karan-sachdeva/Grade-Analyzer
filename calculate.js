var student_input;

function init(){
    var file_input = document.getElementById('fileInput');
    file_input.addEventListener('change', function(){
        handleFileSelect(event);
    });
    var max_input = document.getElementById('Maxinput');
    max_input.addEventListener('change', function(){
        execute(student_input);
    });
    var a_plus_input = document.getElementById('A+input');
    a_plus_input.addEventListener('change', function(){
        execute(student_input);
    });
    var a_input = document.getElementById('Ainput');
    a_input.addEventListener('change', function(){
        execute(student_input);
    });
    var a_minus_input = document.getElementById('A-input');
    a_minus_input.addEventListener('change', function(){
        execute(student_input);
    });
    var b_plus_input = document.getElementById('B+input');
    b_plus_input.addEventListener('change', function(){
        execute(student_input);
    });
    var b_input = document.getElementById('Binput');
    b_input.addEventListener('change', function(){
        execute(student_input);
    });
    var b_minus_input = document.getElementById('B-input');
    b_minus_input.addEventListener('change', function(){
        execute(student_input);
    });
    var c_plus_input = document.getElementById('C+input');
    c_plus_input.addEventListener('change', function(){
        execute(student_input);
    });
    var c_input = document.getElementById('Cinput');
    c_input.addEventListener('change', function(){
        execute(student_input);
    });
    var c_minus_input = document.getElementById('C-input');
    c_minus_input.addEventListener('change', function(){
        execute(student_input);
    });
    var d_input = document.getElementById('Dinput');
    d_input.addEventListener('change', function(){
        execute(student_input);
    });
    var f_input = document.getElementById('Finput');
    f_input.addEventListener('change', function(){
        execute(student_input);
    });
}

function handleFileSelect(event){
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
}
  
function handleFileLoad(event){
    student_input = event.target.result;
    execute(student_input);
}

function execute(student_input){
    checkErrors();
    var student_data = csvToArray(student_input);
    student_data.sort(sortStudentArray);
    fillStats(student_data);
    fillHistogram(student_data);
}

function csvToArray(input) {
    var array = input.split('\n');
    var newArray = [];
    for(var i=0; i<array.length-1; i++) {
        newArray.push(array[i+1].split(','));
    }
    return newArray;
}

function sortStudentArray(a,b) {
    if (parseInt(a[1]) === parseInt(b[1])) {
        return 0;
    }
    else {
        return (parseInt(a[1]) < parseInt(b[1])) ? -1 : 1;
    }
}

function getMedian(student_data){
    var median_index;
    if (student_data.length % 2 == 0){
        median_index = (student_data.length)/2;
        return (parseFloat(student_data[median_index][1]) + parseFloat(student_data[median_index-1][1]))/2.0;
    }
    else {
        median_index = (student_data.length-1)/2;
        return student_data[median_index][1];
    }
}

function getMean(student_data){
    var count = 0.0;
    for(var i = 0; i<student_data.length; i++){
        count = count + parseFloat(student_data[i][1]);
    }
    return (count/student_data.length).toFixed(2);
}

function fillStats(student_data){
    document.getElementById('Highest').innerHTML = "Highest&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('Highest').append(student_data[student_data.length-1][0]);
    document.getElementById('Lowest').innerHTML = "Lowest&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('Lowest').append(student_data[0][0]);
    document.getElementById('Mean').innerHTML = "Mean&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('Mean').append(getMean(student_data));
    document.getElementById('Median').innerHTML = "Median&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('Median').append(getMedian(student_data));
}

function fillHistogram(student_data){
    var a_plus_count = 0, a_count = 0, a_minus_count = 0, b_plus_count = 0, b_count = 0, b_minus_count = 0;
    var c_plus_count = 0, c_count = 0, c_minus_count = 0, d_count = 0, f_count = 0;
    for(var i = 0; i<student_data.length; i++){
        var bound = checkBound(parseFloat(student_data[i][1]));
        if(bound == "A+")
        a_plus_count++;
        else if(bound == "A")
        a_count++;
        else if(bound == "A-")
        a_minus_count++;
        if(bound == "B+")
        b_plus_count++;
        else if(bound == "B")
        b_count++;
        else if(bound == "B-")
        b_minus_count++;
        if(bound == "C+")
        c_plus_count++;
        else if(bound == "C")
        c_count++;
        else if(bound == "C-")
        c_minus_count++;
        if(bound == "D")
        d_count++;
        else if(bound == "F")
        f_count++;
    }
    document.getElementById('A+').innerHTML = "A+&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('A+').append(getBar(a_plus_count));
    document.getElementById('B+').innerHTML = "A+&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('B+').append(getBar(b_plus_count));
    document.getElementById('C+').innerHTML = "C+&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('C+').append(getBar(c_plus_count));
    document.getElementById('A-').innerHTML = "A-&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('A-').append(getBar(a_minus_count));
    document.getElementById('B-').innerHTML = "B-&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('B-').append(getBar(b_minus_count));
    document.getElementById('C-').innerHTML = "C-&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;";
    document.getElementById('C-').append(getBar(c_minus_count));
    document.getElementById('A').innerHTML = "A&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;";
    document.getElementById('A').append(getBar(a_count));
    document.getElementById('B').innerHTML = "B&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;";
    document.getElementById('B').append(getBar(b_count));
    document.getElementById('C').innerHTML = "C&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;";
    document.getElementById('C').append(getBar(c_count));
    document.getElementById('D').innerHTML = "D&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;";
    document.getElementById('D').append(getBar(d_count));
    document.getElementById('F').innerHTML = "F&nbsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;";
    document.getElementById('F').append(getBar(f_count));
}

function checkBound(grade){
    var max_bound = document.getElementById("Maxinput").value;
    var a_plus_bound = document.getElementById("A+input").value;
    var a_bound = document.getElementById("Ainput").value;
    var a_minus_bound = document.getElementById("A-input").value;
    var b_plus_bound = document.getElementById("B+input").value;
    var b_bound = document.getElementById("Binput").value;
    var b_minus_bound = document.getElementById("B-input").value;
    var c_plus_bound = document.getElementById("C+input").value;
    var c_bound = document.getElementById("Cinput").value;
    var c_minus_bound = document.getElementById("C-input").value;
    var d_bound = document.getElementById("Dinput").value;
    var f_bound = document.getElementById("Finput").value;
    
    if(grade<=max_bound && grade>=a_plus_bound){
        return "A+";
    }
    else if(grade<a_plus_bound && grade>=a_bound){
        return "A";
    }
    else if(grade<a_bound && grade>=a_minus_bound){
        return "A-";
    }
    else if(grade<a_minus_bound && grade>=b_plus_bound){
        return "B+";
    }
    else if(grade<b_plus_bound && grade>=b_bound){
        return "B";
    }
    else if(grade<b_bound && grade>=b_minus_bound){
        return "B-";
    }
    else if(grade<b_minus_bound && grade>=c_plus_bound){
        return "C+";
    }
    else if(grade<c_plus_bound && grade>=c_bound){
        return "C";
    }
    else if(grade<c_bound && grade>=c_minus_bound){
        return "C-";
    }
    else if(grade<c_minus_bound && grade>=d_bound){
        return "D";
    }
    else if(grade<d_bound && grade>=f_bound){
        return "F";
    }
}

function getBar(length){
    var s = "";
    for(var i =0; i<length; i++){
        s = s.concat("O");
    }
    return s;
}

function checkErrors(){
    var max_bound = parseFloat(document.getElementById("Maxinput").value);
    var a_plus_bound = parseFloat(document.getElementById("A+input").value);
    var a_bound = parseFloat(document.getElementById("Ainput").value);
    var a_minus_bound = parseFloat(document.getElementById("A-input").value);
    var b_plus_bound = parseFloat(document.getElementById("B+input").value);
    var b_bound = parseFloat(document.getElementById("Binput").value);
    var b_minus_bound = parseFloat(document.getElementById("B-input").value);
    var c_plus_bound = parseFloat(document.getElementById("C+input").value);
    var c_bound = parseFloat(document.getElementById("Cinput").value);
    var c_minus_bound = parseFloat(document.getElementById("C-input").value);
    var d_bound = parseFloat(document.getElementById("Dinput").value);
    var f_bound =parseFloat(document.getElementById("Finput").value);
    if(max_bound<= a_plus_bound || a_plus_bound<=a_bound || a_bound<=a_minus_bound|| 
        a_minus_bound<= b_plus_bound || b_plus_bound<=b_bound || 
        b_bound<=b_minus_bound || b_minus_bound<=c_plus_bound ||
        c_plus_bound<=c_bound||c_bound<=c_minus_bound||
         c_minus_bound<=d_bound || d_bound<=f_bound){
             window.alert("Please enter correct bounds for accurate results!");
         }
            
}

init();