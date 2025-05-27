from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_add_data_atualizacao_field'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='projeto',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='projeto',
            name='updated_at',
        ),
        migrations.AlterField(
            model_name='projeto',
            name='data_criacao',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='projeto',
            name='data_atualizacao',
            field=models.DateTimeField(auto_now=True),
        ),
    ] 