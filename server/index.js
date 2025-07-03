const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const PORT = 3000

// Middlewares
app.use(cors())
app.use(express.json())

const clientDistPath = path.join(__dirname, '..', 'dist')
app.use(express.static(clientDistPath))

app.get('/registration', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'))
})

app.post('/registration', (req, res) => {
  const data = req.body

  const requiredFieldsByUserType = {
    default: ['email', 'userType', 'password'],
    PF: ['name', 'cpf', 'birthDate', 'phone'],
    PJ: ['companyName', 'cnpj', 'companyOpeningDate', 'companyPhone']
  }

  const requiredFields = [
    ...requiredFieldsByUserType.default, 
    ...requiredFieldsByUserType[data.userType]
  ]

  const missingFields = requiredFields.filter(field => !data[field])

  if (missingFields.length) {
    return res.status(400).json({
      error: `Required fields were not filled: ${missingFields.join(', ')}`
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Cadastro simulado com sucesso!'
  })
})

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}/registration`)
})
