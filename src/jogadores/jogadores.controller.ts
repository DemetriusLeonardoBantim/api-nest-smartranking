import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogadore.interface'

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
        return criarJogadorDto
    }

    @Get()
    async consultarJogadores(@Param() teste:any): Promise<Jogador[]> {
        console.log('teste aqui', teste)
        return this.jogadoresService.consultarTodosJogadores()
    }
}
