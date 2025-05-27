from django.db import migrations, models
import django.db.models.deletion

def set_default_criado_por(apps, schema_editor):
    Projeto = apps.get_model('core', 'Projeto')
    User = apps.get_model('auth', 'User')
    # Pega o primeiro usuário do sistema como padrão
    default_user = User.objects.first()
    if default_user:
        Projeto.objects.filter(criado_por__isnull=True).update(criado_por=default_user)

class Migration(migrations.Migration):
    dependencies = [
        ('core', '0008_alter_responsavel_nullable'),
    ]

    operations = [
        migrations.RunPython(set_default_criado_por),
        migrations.AlterField(
            model_name='projeto',
            name='criado_por',
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name='projetos_criados',
                to='auth.user'
            ),
        ),
    ] 