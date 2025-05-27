from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('projetos/', views.lista_projetos, name='lista_projetos'),
    path('projetos/criar/', views.criar_projeto, name='criar_projeto'),
    path('projetos/<int:projeto_id>/', views.detalhe_projeto, name='detalhe_projeto'),
    path('projetos/<int:projeto_id>/editar/', views.editar_projeto, name='editar_projeto'),
    path('projetos/<int:projeto_id>/excluir/', views.excluir_projeto, name='excluir_projeto'),
    path('projetos/<int:projeto_id>/tarefas/criar/', views.criar_tarefa, name='criar_tarefa'),
    path('tarefas/<int:tarefa_id>/editar/', views.editar_tarefa, name='editar_tarefa'),
    path('tarefas/<int:tarefa_id>/excluir/', views.excluir_tarefa, name='excluir_tarefa'),
    path('tarefas/<int:tarefa_id>/atualizar-status/', views.atualizar_status_tarefa, name='atualizar_status_tarefa'),
    path('projetos/<int:projeto_id>/kanban/', views.kanban, name='kanban'),
] 