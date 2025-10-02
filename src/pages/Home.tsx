import React from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

const Home: React.FC = () => {
    const [inputValue, setInputValue] = React.useState('')
    const [showModal, setShowModal] = React.useState(false)

    return (
        <div className="home-page">
            <div className="container">
                <h1>Добро пожаловать на главную страницу!</h1>
                <p>Это пример страницы с использованием созданных компонентов.</p>

                <div className="home-content">
                    <Card
                        title="Форма ввода"
                        description="Пример использования компонента Input"
                        variant="elevated"
                    >
                        <Input
                            label="Ваше имя"
                            placeholder="Введите ваше имя"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            required
                        />
                        <Button
                            variant="primary"
                            onClick={() => alert(`Привет, ${inputValue || 'незнакомец'}!`)}
                        >
                            Поздороваться
                        </Button>
                    </Card>

                    <Card
                        title="Действия"
                        description="Различные варианты кнопок"
                        variant="outlined"
                    >
                        <div className="button-group">
                            <Button variant="primary" onClick={() => setShowModal(true)}>
                                Открыть модал
                            </Button>
                            <Button variant="success">
                                Успех
                            </Button>
                            <Button variant="warning">
                                Предупреждение
                            </Button>
                            <Button variant="danger">
                                Опасность
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Home
