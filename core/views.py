from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Projeto, Tarefa, Comentario
from django.contrib.auth.models import User
import json

@login_required
def dashboard(request):
    projetos = Projeto.objects.filter(criado_por=request.user)
    return render(request, 'core/dashboard.html', {'projetos': projetos})

@login_required
def lista_projetos(request):
    projetos = Projeto.objects.filter(criado_por=request.user)
    return render(request, 'core/lista_projetos.html', {'projetos': projetos})

@login_required
def detalhe_projeto(request, projeto_id):
    projeto = get_object_or_404(Projeto, id=projeto_id)
    tarefas = Tarefa.objects.filter(projeto=projeto)
    return render(request, 'core/detalhe_projeto.html', {'projeto': projeto, 'tarefas': tarefas})

@login_required
def criar_projeto(request):
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        status = request.POST.get('status')
        municipio = request.POST.get('municipio')
        data_inicio = request.POST.get('data_inicio') or None
        data_prevista = request.POST.get('data_prevista') or None
        responsavel_id = request.POST.get('responsavel') or None
        sla = request.POST.get('sla')

        projeto = Projeto.objects.create(
            titulo=titulo,
            descricao=descricao,
            status=status,
            municipio=municipio,
            data_inicio=data_inicio,
            data_prevista=data_prevista,
            responsavel_id=responsavel_id,
            sla=sla,
            criado_por=request.user
        )

        messages.success(request, 'Projeto criado com sucesso!')
        return redirect('detalhe_projeto', projeto_id=projeto.id)

    usuarios = User.objects.all()
    return render(request, 'core/criar_projeto.html', {'usuarios': usuarios})

@login_required
def editar_projeto(request, projeto_id):
    projeto = get_object_or_404(Projeto, id=projeto_id)
    usuarios = User.objects.all()

    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        status = request.POST.get('status')
        municipio = request.POST.get('municipio')
        data_inicio = request.POST.get('data_inicio')
        data_prevista = request.POST.get('data_prevista')
        responsavel_id = request.POST.get('responsavel')
        sla = request.POST.get('sla')

        projeto.titulo = titulo
        projeto.descricao = descricao
        projeto.status = status
        projeto.municipio = municipio
        projeto.data_inicio = data_inicio if data_inicio else None
        projeto.data_prevista = data_prevista if data_prevista else None
        projeto.responsavel_id = responsavel_id if responsavel_id else None
        projeto.sla = sla
        projeto.save()

        messages.success(request, 'Projeto atualizado com sucesso!')
        return redirect('detalhe_projeto', projeto_id=projeto.id)

    return render(request, 'core/editar_projeto.html', {
        'projeto': projeto,
        'usuarios': usuarios
    })

@login_required
def excluir_projeto(request, projeto_id):
    projeto = get_object_or_404(Projeto, id=projeto_id)
    if request.method == 'POST':
        projeto.delete()
        messages.success(request, 'Projeto excluído com sucesso!')
        return redirect('lista_projetos')
    return render(request, 'core/excluir_projeto.html', {'projeto': projeto})

@login_required
def excluir_tarefa(request, tarefa_id):
    tarefa = get_object_or_404(Tarefa, id=tarefa_id)
    projeto_id = tarefa.projeto.id
    if request.method == 'POST':
        tarefa.delete()
        messages.success(request, 'Tarefa excluída com sucesso!')
        return redirect('kanban', projeto_id=projeto_id)
    return render(request, 'core/excluir_tarefa.html', {'tarefa': tarefa})

@login_required
def criar_tarefa(request, projeto_id):
    projeto = get_object_or_404(Projeto, id=projeto_id)
    usuarios = User.objects.all()
    
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        status = request.POST.get('status')
        prioridade = request.POST.get('prioridade')
        data_inicio = request.POST.get('data_inicio')
        data_prevista = request.POST.get('data_prevista')
        responsavel_id = request.POST.get('responsavel')
        
        if not responsavel_id:
            messages.error(request, 'É necessário selecionar um responsável para a tarefa.')
            return render(request, 'core/criar_tarefa.html', {
                'projeto': projeto,
                'usuarios': usuarios
            })
        
        try:
            tarefa = Tarefa.objects.create(
                projeto=projeto,
                titulo=titulo,
                descricao=descricao,
                status=status,
                prioridade=prioridade,
                data_inicio=data_inicio,
                data_prevista=data_prevista,
                responsavel_id=responsavel_id
            )
            
            messages.success(request, 'Tarefa criada com sucesso!')
            return redirect('detalhe_projeto', projeto_id=projeto.id)
        except Exception as e:
            messages.error(request, f'Erro ao criar tarefa: {str(e)}')
            return render(request, 'core/criar_tarefa.html', {
                'projeto': projeto,
                'usuarios': usuarios
            })
    
    return render(request, 'core/criar_tarefa.html', {
        'projeto': projeto,
        'usuarios': usuarios
    })

@login_required
def editar_tarefa(request, tarefa_id):
    tarefa = get_object_or_404(Tarefa, id=tarefa_id)
    
    if request.method == 'POST':
        titulo = request.POST.get('titulo')
        descricao = request.POST.get('descricao')
        status = request.POST.get('status')
        prioridade = request.POST.get('prioridade')
        data_inicio = request.POST.get('data_inicio')
        data_prevista = request.POST.get('data_prevista')
        responsavel_id = request.POST.get('responsavel')
        
        tarefa.titulo = titulo
        tarefa.descricao = descricao
        tarefa.status = status
        tarefa.prioridade = prioridade
        tarefa.data_inicio = data_inicio if data_inicio else None
        tarefa.data_prevista = data_prevista if data_prevista else None
        tarefa.responsavel_id = responsavel_id
        
        tarefa.save()
        messages.success(request, 'Tarefa atualizada com sucesso!')
        return redirect('kanban', projeto_id=tarefa.projeto.id)
    
    usuarios = User.objects.all()
    return render(request, 'core/editar_tarefa.html', {
        'tarefa': tarefa,
        'usuarios': usuarios
    })

@login_required
@require_POST
def atualizar_status_tarefa(request, tarefa_id):
    try:
        data = json.loads(request.body)
        novo_status = data.get('status')
        
        tarefa = get_object_or_404(Tarefa, id=tarefa_id)
        tarefa.status = novo_status
        tarefa.save()
        
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})

@login_required
def kanban(request, projeto_id):
    projeto = get_object_or_404(Projeto, id=projeto_id)
    tarefas_pendentes = Tarefa.objects.filter(projeto=projeto, status='pendente')
    tarefas_em_andamento = Tarefa.objects.filter(projeto=projeto, status='em_andamento')
    tarefas_concluidas = Tarefa.objects.filter(projeto=projeto, status='concluida')
    
    return render(request, 'core/kanban.html', {
        'projeto': projeto,
        'tarefas_pendentes': tarefas_pendentes,
        'tarefas_em_andamento': tarefas_em_andamento,
        'tarefas_concluidas': tarefas_concluidas
    })
