import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SkillsTable } from './SkillsTable';
import { type Skill } from '../../types/types';

const mockSkills: Skill[] = [
    {
        id: '1',
        name: 'React.js',
        type: 'HARD',
        active: true,
        category: 'FRONTEND',
        description: 'Biblioteca JS',
        resourcesCount: 342,
        averageProficiency: 75,
        avatarUrls: ['https://example.com/a.jpg'],
    },
    {
        id: '2',
        name: 'Python',
        type: 'HARD',
        active: true,
        category: 'BACKEND',
        description: 'Linguagem',
        resourcesCount: 215,
        averageProficiency: 50,
    },
    {
        id: '3',
        name: 'Figma',
        type: 'HARD',
        active: true,
        category: 'DESIGN',
        description: 'Design Tool',
        resourcesCount: 86,
        averageProficiency: 66,
    },
];

describe('Componente SkillsTable', () => {
    it('deve renderizar a tabela com os dados das skills', () => {
        render(<SkillsTable data={mockSkills} />);

        expect(screen.getByText('React.js')).toBeInTheDocument();
        expect(screen.getByText('Python')).toBeInTheDocument();
        expect(screen.getByText('Figma')).toBeInTheDocument();
    });

    it('deve exibir descrição e categorias em português', () => {
        render(<SkillsTable data={mockSkills} />);

        expect(screen.getByText('Biblioteca JS')).toBeInTheDocument();
        expect(screen.getByText('Frontend')).toBeInTheDocument();
        expect(screen.getByText('Backend')).toBeInTheDocument();
        expect(screen.getByText('Design')).toBeInTheDocument();
    });

    it('deve exibir nível médio como percentual da API', () => {
        render(<SkillsTable data={mockSkills} />);

        expect(screen.getByText('75.0%')).toBeInTheDocument();
        expect(screen.getByText('50.0%')).toBeInTheDocument();
        expect(screen.getByText('66.0%')).toBeInTheDocument();
    });

    it('deve exibir zero quando proficiência não vier da API', () => {
        const skillWithoutMetrics = {
            ...mockSkills[0],
            averageProficiency: undefined,
            resourcesCount: undefined,
        } as unknown as Skill;

        render(<SkillsTable data={[skillWithoutMetrics]} />);

        expect(screen.getByText('0.0%')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('deve exibir avatares quando avatarUrls vier da API', () => {
        render(<SkillsTable data={mockSkills} />);

        expect(screen.getByAltText('React.js 1')).toBeInTheDocument();
    });

    it('deve exibir mensagem quando não houver dados', () => {
        render(<SkillsTable data={[]} />);

        expect(screen.getByText('Nenhuma skill encontrada')).toBeInTheDocument();
    });

    it('deve chamar onEdit ao clicar no botão de editar', () => {
        const handleEdit = vi.fn();
        render(<SkillsTable data={mockSkills} onEdit={handleEdit} />);

        fireEvent.click(screen.getAllByRole('button', { name: 'Editar skill' })[0]);

        expect(handleEdit).toHaveBeenCalledWith(mockSkills[0]);
    });

    it('deve chamar onDelete ao clicar no botão de excluir', () => {
        const handleDelete = vi.fn();
        render(<SkillsTable data={mockSkills} onDelete={handleDelete} />);

        fireEvent.click(screen.getAllByRole('button', { name: 'Excluir skill' })[0]);

        expect(handleDelete).toHaveBeenCalledWith(mockSkills[0]);
    });

    it('deve desabilitar o botão de excluir quando a skill estiver sendo excluída', () => {
        render(
            <SkillsTable
                data={mockSkills}
                deletingSkillId={mockSkills[0].id}
                onDelete={vi.fn()}
            />
        );

        const deleteButtons = screen.getAllByRole('button', { name: 'Excluir skill' });

        expect(deleteButtons[0]).toBeDisabled();
        expect(deleteButtons[1]).not.toBeDisabled();
    });

    it('deve renderizar as colunas na ordem correta', () => {
        const { container } = render(<SkillsTable data={mockSkills} />);

        const headers = container.querySelectorAll('th');
        expect(headers[0]).toHaveTextContent('SKILL');
        expect(headers[1]).toHaveTextContent('CATEGORIA');
        expect(headers[2]).toHaveTextContent('QTD. RECURSOS');
        expect(headers[3]).toHaveTextContent('NÍVEL MÉDIO');
        expect(headers[4]).toHaveTextContent('AÇÕES');
    });
});
