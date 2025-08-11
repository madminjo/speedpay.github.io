
// ------------------------------------Examination-------------------------------


const btn = document.getElementById('findBtn')
const resultatDev = document.getElementById('resultat') 

btn.addEventListener('click', () => {
	const uid = document.getElementById('playerUid').value.trim()

	if(!uid) {
		resultatDev.innerHTML = '<p id="error">Пожалуюста укажите свой Uid</p>';
		return
	}


	resultatDev.textContent = 'Загруска...'
	btn.disabled = true;
	
	fetch(`https://accinfo.vercel.app/player-info?region=SG&uid=${encodeURIComponent(uid)}`)
	.then(response => {
		if(!response.ok) throw new Error(`Ошибка в сети: ${response.status}`)
		return response.json();
	})

	.then(data => {
		if(!data.basicInfo) {
			resultatDev.innerHTML = '<p id="error">Ошибка: данные не найдены в ответ.</p>'
			return
		}

    const nickname = data.basicInfo.nickname || 'неизвестно';
    const accountId = data.basicInfo.accountId || 'неизвестно';

		resultatDev.innerHTML = `
		<p><strong>Имя игрока: </strong> ${nickname}</p>
		<p><strong>ID аккаунта:	</strong> ${accountId}</p>
		`;
	})
	.catch(err => {
		resultatDev.innerHTML = `<p id="error">Ошибка запроса: ${err.message}</p>`;
	})
	.finally(() => {
		btn.disabled = false;
	})
})


// ---------------------------------Bacground----------------------------------
const canvas = document.getElementById('background')
const ctx = canvas.getContext('2d')

function resizeCanvas() {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener('resize', resizeCanvas)

let dots = []
for (let i = 0; i < 100; i++) {
	dots.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		radius: Math.random() * 2 + 2,
		dx: (Math.random() - 0.5) * 0.5,
		dy: (Math.random() - 0.5) * 0.5,
		color: Math.random() > 0.5 ? '#ff6600' : '#0099ff',
	})
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	dots.forEach(dot => {
		ctx.beginPath()
		ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)

		ctx.shadowBlur = 5
		ctx.shadowColor = dot.color

		ctx.fillStyle = dot.color
		ctx.fill()

		dot.x += dot.dx
		dot.y += dot.dy

		if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1
		if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1
	})

	requestAnimationFrame(animate)
}

animate()
