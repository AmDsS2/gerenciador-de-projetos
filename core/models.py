from django.db import models
from django.contrib.auth.models import User

class Projeto(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('em_andamento', 'Em Andamento'),
        ('concluido', 'Concluído'),
        ('cancelado', 'Cancelado'),
    ]

    SLA_CHOICES = [
        ('24h', '24 horas'),
        ('48h', '48 horas'),
        ('72h', '72 horas'),
        ('5d', '5 dias'),
        ('10d', '10 dias'),
        ('15d', '15 dias'),
        ('30d', '30 dias'),
    ]

    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')
    municipio = models.CharField(max_length=100, null=True, blank=True)
    data_inicio = models.DateField(null=True, blank=True)
    data_prevista = models.DateField(null=True, blank=True)
    responsavel = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='projetos_responsavel')
    membros = models.ManyToManyField(User, related_name='projetos_membro')
    sla = models.CharField(max_length=10, choices=SLA_CHOICES, null=True, blank=True)
    criado_por = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projetos_criados')
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo

    class Meta:
        verbose_name = 'Projeto'
        verbose_name_plural = 'Projetos'
        ordering = ['-data_criacao']

class Tarefa(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('em_andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
    ]
    
    PRIORIDADE_CHOICES = [
        ('baixa', 'Baixa'),
        ('media', 'Média'),
        ('alta', 'Alta'),
    ]
    
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, related_name='tarefas')
    responsavel = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tarefas_responsavel')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')
    prioridade = models.CharField(max_length=20, choices=PRIORIDADE_CHOICES, default='media')
    data_inicio = models.DateField()
    data_prevista = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.titulo

class Comentario(models.Model):
    tarefa = models.ForeignKey(Tarefa, on_delete=models.CASCADE, related_name='comentarios')
    autor = models.ForeignKey(User, on_delete=models.CASCADE)
    texto = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comentário de {self.autor.username} em {self.tarefa.titulo}'
