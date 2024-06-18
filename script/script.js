console.log('made by BatteryB')
$(document).ready(function () {
    const difficulty = [
        {
            difficul: '쉬움',
            pointSize: {
                width: 70,
                height: 70
            },
        },
        {
            difficul: '보통',
            pointSize: {
                width: 50,
                height: 50
            },
        },
        {
            difficul: '어려움',
            pointSize: {
                width: 35,
                height: 35
            },
        }
    ];

    let thisDefficulty, startCounting, gameTime, timer;
    let left, top;
    let countDown = 5, time = 30;
    let $container = $('.container');
    let score = 0;

    function Initialization() { // 초기화
        clearInterval(timer);
        clearInterval(gameTime);
        clearInterval(startCounting);
        time = 30;
        countDown = 5;
        score = 0;
        $('#gameForm>h1>span').text(countDown);
        $('#score>span').text(score);
        $('#time').text(time);
        $('#gameForm>h1').css({ display: 'block' });
        $('.clickPoint').css({ display: 'none' });
    }

    $('#mainForm').on('submit', function (e) {
        e.preventDefault();

        let checkDifficul = $('input[name="difficulty"]:checked').val();
        thisDefficulty = difficulty.find(d => d.difficul === checkDifficul); // 유저가 선택한 난이도와 같은 난이도의 값을 배열에서 찾기

        $('.clickPoint').css({ // clickPoint에 난이도에 맞는 사이즈 지정
            width: thisDefficulty.pointSize.width + 'px',
            height: thisDefficulty.pointSize.height + 'px'
        });

        $('#game>h2').text(checkDifficul); // 난이도 표시
        $container.toggleClass('start'); // start클래스 부여

        startCounting = setInterval(() => { // 1초마다
            if (countDown <= 0) {
                $('#gameForm>h1').css({ display: 'none' }); // 카운트다운 글자 숨기기
                gameStart();
                pointSetPosition();
                clearInterval(startCounting); // 카운트다운 인터벌 끄기
                return;
            }
            $('#gameForm>h1>span').text(countDown);
            countDown--;
        }, 1000);
    });

    $('#gameForm').on('submit', function (e) {
        e.preventDefault();
        alert(`당신의 점수: ${score}점`);
        $container.toggleClass('start');
        Initialization();
    });

    $('.clickPoint').on('click', function () {
        pointSetPosition(); // 클릭 시 포인트 위치 변경
        score++;
        $('#score>span').text(score);
        resetTimer(); // 클릭 시 타이머 초기화
    });

    function gameStart() {
        $('.clickPoint').css({ display: 'block' }); // 포인트 보이기
        gameTime = setInterval(() => {
            if (time <= 0) {
                clearInterval(gameTime);
                endGame();
                return;
            }
            time--;
            $('#time').text(time);
        }, 1000);
        resetTimer(); // 게임 시작 시 타이머 설정
    }

    function endGame() {
        alert(`당신의 점수: ${score}점`);
        $container.toggleClass('start');
        Initialization();
    }

    function resetTimer() {
        clearInterval(timer); // 기존 타이머 정지
        timer = setInterval(() => {
            pointSetPosition(); // 타이머 만료 시 포인트 위치 변경
        }, 1500);
    }

    function pointSetPosition() {
        left = Math.floor(Math.random() * 80) + 10; // 위치 랜덤지정
        top = Math.floor(Math.random() * 80) + 10;

        $('.clickPoint').css({ // 적용
            left: left + '%',
            top: top + '%'
        });
    }
});
